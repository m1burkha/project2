import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '@services/employee/employee.service';
import {Employee, IEmployee} from '@domain-models/employee/employee';
import {Observable} from 'rxjs/Observable';

/**
 * Component to administrage employees
 */
@Component({
  selector: 'app-employee-administration',
  templateUrl: './employee-administration.component.html',
  styleUrls: ['./employee-administration.component.scss']
})
export class EmployeeAdministrationComponent implements OnInit {
  /** observed employees */
  employees: Observable<IEmployee[]>;

  /**
   * creates component
   * @param {EmployeeService} employeeService employee service
   */
  constructor(private employeeService: EmployeeService) {
  }

  /**
   * initializes component
   */
  ngOnInit() {
    this.employees = this.employeeService.readAll();
  }

  /**
   * add a new employee
   * @param event event data from dx grid
   */
  insert(event: any): void {
    const employee = new Employee();
    employee.caption = event.data.caption;
    employee.department = event.data.department;
    employee.weekHours = +event.data.weekHours;
    employee.workLoad = +event.data.workLoad;
    employee.vacationDays = +event.data.vacationDays;
    this.employeeService.create(employee);
  }

  /**
   * update an existing employee
   * @param event event data from dx grid
   */
  update(event: any): void {
    this.employeeService.updatePartial(event.key.id, event.newData);
  }

  /**
   * delete an existing employee
   * @param event event data from dx grid
   */
  delete(event: any): void {
    this.employeeService.delete(event.key.id);
  }
}
