import {Injectable} from '@angular/core';
import {FirestoreService} from '@services/firestore/firestore.service';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import {IShiftSchedule} from '@domain-models/shift-scheduling/shift-schedule';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import DocumentReference = firebase.firestore.DocumentReference;

/**
 * shift scheduling service
 */
@Injectable()
export class ShiftScheduleService extends FirestoreService<IShiftSchedule> {

  /**
   * initializes shift scheduling service
   * @param {AngularFirestore} db angular firestore
   */
  constructor(protected db: AngularFirestore) {
    super(db);
    this.setCollection('ShiftScheduling');
  }

  setAlternativeCollection(year: string, month: string) {
    this.db.collection('ShiftScheduling').doc(year).collection(month);
  }

  readShifts(year: string, month: string, id: string): AngularFirestoreDocument<IShiftSchedule> {
    this.setAlternativeCollection(year, month);
    return this.read(id);
  }

  public readAllShifts(year: string, month: string): Observable<IShiftSchedule[]> {
    this.setAlternativeCollection(year, month);
    return    this.readAll();
  }

  public createShift(object: IShiftSchedule): Promise<DocumentReference> {
    this.setAlternativeCollection(object.date.getFullYear().toString(), object.date.getMonth().toString());
    return this.create(object);
  }

  public updateShift(id: string, object: IShiftSchedule): Promise<void> {
    this.setAlternativeCollection(object.date.getFullYear().toString(), object.date.getMonth().toString());
    return this.update(id, object);
  }

  public updatePartialShift(id: string, object: Partial<IShiftSchedule>): Promise<void> {
    this.setAlternativeCollection(object.date.getFullYear().toString(), object.date.getMonth().toString());
    return this.updatePartial(id, object);
  }

  public deleteShift(id: string, object: IShiftSchedule): Promise<void> {
    this.setAlternativeCollection(object.date.getFullYear().toString(), object.date.getMonth().toString());
    return this.delete(id);
  }
}

