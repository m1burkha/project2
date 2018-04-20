import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {ShiftScheduleComponent} from '@components/shift-planner/shift-scheduling/shift-schedule.component';
import {EmployeeService} from '@services/employee/employee.service';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from '@components/header/header.component';
import {ShiftScheduleService} from '@services/shift-scheduling/shift-scheduling.service';
import {ShiftItemsService} from '@services/shift-items/shift-items.service';
import {By} from '@angular/platform-browser';
import {
  DxButtonModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxLookupModule,
  DxSelectBoxModule
} from 'devextreme-angular';
import {RouterTestingModule} from '@angular/router/testing';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {IShiftSchedule} from '@domain-models/shift-scheduling/shift-schedule';
import {IEmployee} from '@domain-models/employee/employee';
import {IShiftItem} from '@domain-models/shift-scheduling/shift-item';
import {ShiftType} from '@domain-models/shift-scheduling/shift-type.enum';


describe('ShiftScheduleComponent', () => {
  let component: ShiftScheduleComponent;
  let dataGridComponent: DxDataGridComponent;
  let fixture: ComponentFixture<ShiftScheduleComponent>;

  const mockScheduleService: any = {
    readAllShifts: jasmine.createSpy('readAllShifts')
      .and.returnValue(new Observable<IShiftSchedule[]>(ob => ob.next(require('../../../../assets/data/mockdata/shiftSchedules.json'))))
  };

  const mockEmployeeService: any = {
    readAll: jasmine.createSpy('readAll')
      .and.returnValue(new Observable<IEmployee[]>(ob => ob.next(require('../../../../assets/data/mockdata/employees.json'))))
  };

  const mockTemplateService: any = {
    readAll: jasmine.createSpy('ReadAll')
      .and.returnValue(new Observable<IShiftItem[]>(ob => ob.next(require('../../../../assets/data/mockdata/shift-templates.json'))))
  };

  console.log('x', mockTemplateService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        DxButtonModule,
        DxLookupModule,
        DxSelectBoxModule,
        DxDataGridModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      declarations: [ShiftScheduleComponent, HeaderComponent],
      providers: [
        {provide: EmployeeService, useValue: mockEmployeeService},
        {provide: ShiftScheduleService, useValue: mockScheduleService},
        {provide: ShiftItemsService, useValue: mockTemplateService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const gridElement = fixture.debugElement.query(By.css('dx-data-grid'));
    dataGridComponent = <DxDataGridComponent>gridElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create dataGridComponent component', inject([ShiftScheduleService], (service: ShiftScheduleService) => {
    expect(dataGridComponent).toBeTruthy();
  }));

  it('should retrieve shiftSchedule list with 2 shift schedules', inject([ShiftScheduleService], (service: ShiftScheduleService) => {
    service.readAllShifts(new Date()).subscribe(shift => {
      console.log('mock shiftSchedule list', shift);
      expect(shift.length > 0).toBeGreaterThan(0);
    });
  }));

  it('employee must contain employee id of 1FU8y4kVr6AQ8yP6vRX4', inject([EmployeeService], (service: EmployeeService) => {
    service.readAll().subscribe(emplist => {
      console.log('first mock employee', emplist[0]);
      expect(emplist[0].id === '1FU8y4kVr6AQ8yP6vRX4').toBe(true);
    });
  }));

  it('shift template list must contain shift caption workingshift', inject([ShiftItemsService], (service: ShiftItemsService) => {
    service.readAll().subscribe(items => {
      console.log('working shift item', items[6]);
      expect(items[6].type === ShiftType.workingShift).toBe(true);
    });
  }));
});

