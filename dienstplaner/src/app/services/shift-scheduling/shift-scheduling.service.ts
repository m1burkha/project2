import {Injectable} from '@angular/core';
import {FirestoreService} from '@services/firestore/firestore.service';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {IShiftSchedule, ShiftSchedule} from '@domain-models/shift-scheduling/shift-schedule';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import DocumentReference = firebase.firestore.DocumentReference;
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {IShiftItem, ShiftItem} from '@domain-models/shift-scheduling/shift-item';
import {IPublicHolidayShift} from '@domain-models/shift-scheduling/public-holiday-shift';

/**
 * shift scheduling service
 */
@Injectable()
export class ShiftScheduleService extends FirestoreService<IShiftSchedule> {

  /**
   * initializes shift scheduling service
   * @param {AngularFirestore} db angular firestore
   */
  constructor(protected db: AngularFirestore, private httpClient: HttpClient) {
    super(db);
    this.setCollection('ShiftScheduling');
  }

  setAltCollection(date: Date) {
    this.setSubCollection('ShiftScheduling', moment(date).format('YYYY'), moment(date).format('MM'));
  }

  /**
   * gets all shifts of a day
   * @param {string} id date 'YYYY-MM-DD'
   * @returns {AngularFirestoreDocument<IShiftSchedule>}
   */
  public readShifts(id: string): AngularFirestoreDocument<IShiftSchedule> {
    this.setAltCollection(moment(id).toDate());
    return this.read(id);
  }

  /**
   * gets all shifts of a month
   * @param {string} year year, 4 digits
   * @param {string} month human readable month index (jan = 1, dec = 12)
   * @returns {Observable<IShiftSchedule[]>}
   */
  public readAllShifts(date: Date): Observable<IShiftSchedule[]> {
    this.setAltCollection(date);
    return this.readAll();
  }

  /**
   * create a new shift
   * @param {IShiftSchedule} object, id, date, selectedShiftColumnOfEmployees
   * @returns {Promise<DocumentReference>}
   */
  public createShift(object: IShiftSchedule): Promise<DocumentReference> {
    this.setAltCollection(object.date);
    object.id = moment(object.date).format('YYYY-MM-DD');
    return this.create(object);
  }

  /**
   * update the changed shift
   * @param {IShiftSchedule} object, id, date, selectedShiftColumnOfEmployees
   * @returns {Promise<void>}
   */
  public updateShift(object: IShiftSchedule): Promise<void> {
    this.setAltCollection(object.date);
    return this.update(object.id, object);
  }

  /**
   * Update a specific shift
   * @param {string} id
   * @param {Partial<IShiftSchedule>} object, id, date, selectedShiftColumnOfEmployees
   * @returns {Promise<void>}
   */
  public updatePartialShift(id: string, object: Partial<IShiftSchedule>): Promise<void> {
    this.setAltCollection(object.date);
    return this.updatePartial(id, object);
  }

  /**
   * delete a shift
   * @param {IShiftSchedule} object, id, date, selectedShiftColumnOfEmployees
   * @returns {Promise<void>}
   */
  public deleteShift(object: IShiftSchedule): Promise<void> {
    this.setAltCollection(object.date);
    return this.delete(object.id);
  }

  fetchPublicHolidays(): Observable<IPublicHolidayShift[]> {
    return this.httpClient.get('../../assets/data/Feiertage_2018.json')
      .map(response => {
        return <IPublicHolidayShift[]>response;
      });
  }
}

