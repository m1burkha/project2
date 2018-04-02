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

  setAlternativeCollection(id: string, collection: string) {
    this.db.collection('ShiftScheduling').doc(id).collection(collection);
  }

  readShifts(id: string): Observable<IShiftSchedule> {
    this.setAlternativeCollection(id, 'shiftSchedules');
    return this.read(id).valueChanges();
  }

  public readAllShifts(year: string, month: string): Observable<IShiftSchedule[]> {
    // this.setAlternativeCollection(year, month);
    return this.readAll();
  }

  public createShift(object: IShiftSchedule): Promise<DocumentReference> {
    // this.setAlternativeCollection(object.id, 'shiftSchedules');
    return this.create(object);
  }

  public updateShift(id: string, object: IShiftSchedule): Promise<void> {
    // this.setAlternativeCollection(id, 'shiftSchedules');
    return this.update(id, object);
  }

  public updatePartialShift(id: string, object: Partial<IShiftSchedule>): Promise<void> {
    this.setAlternativeCollection(object.date.getFullYear().toString(), object.date.getMonth().toString());
    return this.updatePartial(id, object);
  }

  public deleteShift(id: string): Promise<void> {
    // this.db.collection('ShiftScheduling').doc(id).collection(`shiftSchedules/${shiftScheduleIndex}`);
    return this.delete(id);
  }

  public createId(): string {
    return this.db.createId();
  }
}

