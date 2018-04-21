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
  DxSelectBoxComponent,
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
import * as moment from 'moment';
import {EmployeeMonthBalanceService} from '@services/employee-month-balance/employee-month-balance.service';
import {MatDialogModule} from '@angular/material';
import {IEmployeeMonthBalance} from '@domain-models/employee-month-balance/employee-month-balance';

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

  const mockEmployeeMonthBalanceService: any = {
    readAll: jasmine.createSpy('readAllBalances')
      .and.returnValue(new Observable<IEmployeeMonthBalance[]>(ob => ob.next(require('../../../../assets/data/mockdata/employee-month-balances.json'))))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        DxButtonModule,
        DxLookupModule,
        DxSelectBoxModule,
        DxDataGridModule,
        MatDialogModule,
        HttpClientModule,
        MatDialogModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      declarations: [ShiftScheduleComponent, HeaderComponent],
      providers: [
        {provide: EmployeeService, useValue: mockEmployeeService},
        {provide: ShiftScheduleService, useValue: mockScheduleService},
        {provide: ShiftItemsService, useValue: mockTemplateService},
        {provide: EmployeeMonthBalanceService, useValue: mockEmployeeMonthBalanceService},
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

  it('should retrieve shiftSchedule list', inject([ShiftScheduleService], (service: ShiftScheduleService) => {
    service.readAllShifts(new Date()).subscribe(shift => {
      console.log('mock shiftSchedule list', shift);
      expect(shift.length > 0).toBeGreaterThan(0);
    });
  }));

  it('employee list must contain employee id of 1FU8y4kVr6AQ8yP6vRX4', inject([EmployeeService], (service: EmployeeService) => {
    service.readAll().subscribe(emplist => {
      console.log('first mock employee', emplist[0]);
      expect(emplist[0].id === '1FU8y4kVr6AQ8yP6vRX4').toBe(true);
    });
  }));

  it('shift template list must contain shift caption of workingshift', inject([ShiftItemsService], (service: ShiftItemsService) => {
    service.readAll().subscribe(items => {
      console.log('working shift item', items[6]);
      expect(items[6].type === ShiftType.workingShift).toBe(true);
    });
  }));

  it('should be datagrid column caption (Employee name) and column count', inject([ShiftScheduleService], (service: ShiftScheduleService) => {
    service.readAllShifts(new Date()).subscribe(shifts => {
      dataGridComponent.dataSource = shifts;
      expect(dataGridComponent.instance.columnCount()).toBe(5);
      expect(dataGridComponent.columns[3].caption).toBe('Kollege Essig');
    });
  }));

  it('month dropdown selection should return month July',  () => {
    const selectElement = fixture.debugElement.query(By.css('dx-select-box'));
    const nativeSelectElement = selectElement.nativeElement;
    const monthSelectComponent = <DxSelectBoxComponent>selectElement.componentInstance;
    fixture.detectChanges();
    moment.locale('de');
    monthSelectComponent.items = moment.months();
    monthSelectComponent.value = monthSelectComponent.items[6];
    nativeSelectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(monthSelectComponent.displayValue).toBe('Juli');
  });
});

