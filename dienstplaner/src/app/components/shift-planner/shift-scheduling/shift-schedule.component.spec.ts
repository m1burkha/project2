import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ShiftScheduleComponent} from '@components/shift-planner/shift-scheduling/shift-schedule.component';
import {EmployeeService} from '@services/employee/employee.service';
import {ShiftScheduleService} from '@services/shift-scheduling/shift-schedule.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Employee} from '@domain-models/employee/employee';
import {ShiftItem} from '@domain-models/shift-scheduling/shift-item';
import {HeaderComponent} from '@components/header/header.component';


describe('ShiftScheduleComponent', () => {
  let component: ShiftScheduleComponent;
  let fixture: ComponentFixture<ShiftScheduleComponent>;
  const employees: Employee[] = [], shiftTemplates: ShiftItem[] = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ShiftScheduleComponent, HeaderComponent],
      providers: [EmployeeService, ShiftScheduleService, HttpClient]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
