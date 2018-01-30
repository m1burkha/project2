import { Injectable } from '@angular/core';
import {IEmployee} from '@domain-models/employee/employee';
import {FirestoreService} from '@services/firestore/firestore.service';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class EmployeeService extends FirestoreService<IEmployee> {

    /**
     * initializes shift scheduling service
     * @param {AngularFirestore} db angular firestore
     */
    constructor(db: AngularFirestore) {
        super(db);
        this.setCollection('Employees');
    }

}
