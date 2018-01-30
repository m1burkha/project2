import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '@services/employee/employee.service';
import {Employee, IEmployee} from '@domain-models/employee/employee';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-employee-administration',
    templateUrl: './employee-administration.component.html',
    styleUrls: ['./employee-administration.component.scss']
})
export class EmployeeAdministrationComponent implements OnInit {
    employees: Observable<IEmployee[]>;

    constructor(private employeeService: EmployeeService) {
    }

    ngOnInit() {
        this.employees = this.employeeService.readAll();
    }

    create() {
        this.employeeService.create(new Employee({caption: 'Marc Iten'}));
        this.employeeService.create(new Employee({caption: 'Marco Petschen'}));
        this.employeeService.create(new Employee({caption: 'Karin Limacher'}));
        this.employeeService.create(new Employee({caption: 'Nadja Schober'}));
    }

    delete(id: string): void {
        this.employeeService.delete(id);
    }

}
