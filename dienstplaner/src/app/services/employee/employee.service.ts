import {Injectable} from '@angular/core';
import {IEmployee} from '@domain-models/employee/employee';
import {FirestoreService} from '@services/firestore/firestore.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

/**
 * service for employees
 */
@Injectable()
export class EmployeeService extends FirestoreService<IEmployee> {

    /**
     * initializes employee service
     * @param {AngularFirestore} db angular firestore
     */
    constructor(db: AngularFirestore) {
        super(db);
        this.setCollection('Employees');
    }
}
