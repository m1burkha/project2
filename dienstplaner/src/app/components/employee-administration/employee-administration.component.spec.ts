import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {EmployeeAdministrationComponent} from './employee-administration.component';
import {HeaderComponent} from '@components/header/header.component';
import {Observable} from 'rxjs/Observable';
import {IEmployee} from '@domain-models/employee/employee';
import {EmployeeService} from '@services/employee/employee.service';
import {DxDataGridComponent, DxDataGridModule} from 'devextreme-angular';
import {By} from '@angular/platform-browser';

describe('EmployeeAdministrationComponent', () => {
  const mockEmployeeService: any = {
    readAll: jasmine.createSpy('readAll')
      .and.returnValue(new Observable<IEmployee[]>(ob => ob.next(require('../../../assets/data/mockdata/employees.json'))))
  };

  let component: EmployeeAdministrationComponent;
  let fixture: ComponentFixture<EmployeeAdministrationComponent>;
  let dataGridComponent: DxDataGridComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DxDataGridModule],
      declarations: [EmployeeAdministrationComponent, HeaderComponent],
      providers: [{provide: EmployeeService, useValue: mockEmployeeService}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const gridElement = fixture.debugElement.query(By.css('dx-data-grid'));
    dataGridComponent = <DxDataGridComponent>gridElement.componentInstance;
  });

  it('should create employee datagrid', inject([EmployeeService], (service: EmployeeService) => {
    expect(dataGridComponent).toBeTruthy();
  }));

  it('should be datagrid column caption (Employee name) and column count', inject([EmployeeService], (service: EmployeeService) => {
    service.readAll().subscribe(employees => {
      dataGridComponent.dataSource = employees;
      expect(dataGridComponent.instance.columnCount()).toBe(6);
      expect(dataGridComponent.columns[3].caption).toBe('Wochenstunden');
    });
  }));

});
