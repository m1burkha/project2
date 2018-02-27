import {Injectable} from '@angular/core';
import {FirestoreService} from '@services/firestore/firestore.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {IShiftSchedule} from '@domain-models/shift-scheduling/shift-schedule';
import * as moment from 'moment';

/**
 * shift scheduling service
 */
@Injectable()
export class ShiftScheduleService extends FirestoreService<IShiftSchedule> {

  /**
   * initializes shift scheduling service
   * @param {AngularFirestore} db angular firestore
   */
  constructor(db: AngularFirestore) {
    super(db);
    this.setCollection('ShiftScheduling');
  }
}

