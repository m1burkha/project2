import {Injectable} from '@angular/core';
import {FirestoreService} from '@services/firestore/firestore.service';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {EmployeeMonthBalance} from '@domain-models/employee-month-balance/employee-month-balance';
import * as firebase from 'firebase/app';
import DocumentReference = firebase.firestore.DocumentReference;

/**
 * service for employees
 */
@Injectable()
export class EmployeeMonthBalanceService extends FirestoreService<EmployeeMonthBalance> {

  /**
   * initializes employee month balance service
   * @param {AngularFirestore} db angular firestore
   */
  constructor(db: AngularFirestore) {
    super(db);
    this.setCollection('EmployeesMonthBalance');
  }

  /**
   * the collection and document path for firebase
   * @param {Date} date
   */
  setAltCollection(year: string, month: string) {
    this.setSubCollection('EmployeesMonthBalance', year, month);
  }

  /**
   * gets the balances of a month of an employee
   * @param {string} id date 'YYYY-MM-DD'
   * @returns {AngularFirestoreDocument<EmployeeMonthBalance>}
   */
  public readBalances(year: string, month: string, id: string): AngularFirestoreDocument<EmployeeMonthBalance> {
    this.setAltCollection(year, month);
    return this.read(id);
  }

  /**
   * gets all balances of a month
   * @param {Date} date
   * @returns {Observable<EmployeeMonthBalance[]>}
   */
  public readAllBalances(year: string, month: string): Observable<EmployeeMonthBalance[]> {
    this.setAltCollection(year, month);
    return this.readAll();
  }

  /**
   * create a new balance
   * @param {EmployeeMonthBalance} object
   * @returns {Promise<DocumentReference>}
   */
  public createBalance(object: EmployeeMonthBalance): Promise<DocumentReference> {
    this.setAltCollection(object.year.toString(), object.month.toString());
    return this.create(object);
  }

  /**
   * update the changed balance
   * @param {EmployeeMonthBalance} object
   * @returns {Promise<void>}
   */
  public updateBalance(object: EmployeeMonthBalance): Promise<void> {
    this.setAltCollection(object.year.toString(), object.month.toString());
    return this.update(object.id, object);
  }

  /**
   * Update a specific balance
   * @param {string} id
   * @param {Partial<EmployeeMonthBalance>} object
   * @returns {Promise<void>}
   */
  public updatePartialBalance(id: string, object: Partial<EmployeeMonthBalance>): Promise<void> {
    this.setAltCollection(object.year.toString(), object.month.toString());
    return this.updatePartial(id, object);
  }

  /**
   * delete a balance
   * @param {EmployeeMonthBalance} object
   * @returns {Promise<void>}
   */
  public deleteBalance(object: EmployeeMonthBalance): Promise<void> {
    this.setAltCollection(object.year.toString(), object.month.toString());
    return this.delete(object.id);
  }
}
