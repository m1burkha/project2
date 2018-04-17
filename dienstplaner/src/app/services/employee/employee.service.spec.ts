import {inject, TestBed} from '@angular/core/testing';

import {EmployeeService} from './employee.service';
import {environment} from '../../../environments/environment';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

describe('EmployeeService', () => {
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
});
