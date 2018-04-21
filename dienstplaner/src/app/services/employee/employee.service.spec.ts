import {inject, TestBed} from '@angular/core/testing';

import {EmployeeService} from './employee.service';
import {environment} from '../../../environments/environment';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {IEmployee} from '@domain-models/employee/employee';

describe('EmployeeService', () => {

  const mockSchedules = new Observable<IEmployee[]>(sub => sub.next(require('../../../assets/data/mockdata/employees.json')));
  const serviceMock: any = {
    readAllShifts: jasmine.createSpy('subscribe')
      .and.returnValue(mockSchedules),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
      ],
      providers: [EmployeeService, AngularFirestore]
    });
  });

  it('should be created', inject([EmployeeService], (service: EmployeeService) => {
    expect(service).toBeTruthy();
  }));

  it('service should return an Observable<IEmployee[]> array',
    inject([EmployeeService], (service: EmployeeService) => {

      service.readAll().subscribe(emps => {
        expect(emps.length).toBe(4);
        expect(emps[0].caption).toEqual('Harry Hasler');
        expect(emps[1].weekHours).toEqual(42);
      });
    }));
});
