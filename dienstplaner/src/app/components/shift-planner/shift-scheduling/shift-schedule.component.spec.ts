import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {ShiftScheduleComponent} from '@components/shift-planner/shift-scheduling/shift-schedule.component';
import {EmployeeService} from '@services/employee/employee.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Employee} from '@domain-models/employee/employee';
import {ShiftItem} from '@domain-models/shift-scheduling/shift-item';
import {HeaderComponent} from '@components/header/header.component';
import {ShiftScheduleService} from "@services/shift-scheduling/shift-scheduling.service";
import {ShiftItemsService} from "@services/shift-items/shift-items.service";
import {by, element} from "protractor";


describe('ShiftScheduleComponent', () => {
  let component: ShiftScheduleComponent;
  let fixture: ComponentFixture<ShiftScheduleComponent>;
  let employees: Employee[] = [], shiftTemplates: ShiftItem[] = [];
  employees = require(('../../../../assets/mockdata/employees.json'));
  shiftTemplates = require(('../../../../assets/mockdata/shift-templates.json'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ShiftScheduleComponent, HeaderComponent],
      providers: [EmployeeService, ShiftScheduleService, ShiftItemsService, HttpClient]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create shiftSchedule component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve shiftSchedule list', () => {
    inject([ShiftScheduleService], (service: ShiftScheduleService) => {

      service.readAllShifts(new Date()).subscribe(shift => {
        expect(shift.length).toBe(2);
      })
    });
  });

  it('employee list should not be empty and must contain employee id of 1FU8y4kVr6AQ8yP6vRX4', () => {
    inject([EmployeeService],(service: EmployeeService) => {
      service.readAll().subscribe(emplist => {
        expect(emplist.length > 0).toBeGreaterThan(0);
        expect(emplist[0].id === '1FU8y4kVr6AQ8yP6vRX4').toBe(true);
      });
    })
  });

  it('shift template list should not be empty and must contain shift caption workingshift', () => {
    inject([ShiftItemsService], (service: ShiftItemsService) => {
      service.readAll().subscribe(items => {
        expect(items.length > 0).toBeGreaterThan(0);
        expect(items[0].caption === 'workingShift').toBe(true);
      });
    });
  });

  it('select shift from drop down ',  () => {
    element(by.css('dx-texteditor-container > dx-item: nth-child(1)')).click().then(() => {
      console.log(element(by.css('dx-list-item-content')).getText());
      // expect(element(by.css('dx-list-item-content')).getText()).toBe(`07:00 - 16:30`);
    })

  });
});
