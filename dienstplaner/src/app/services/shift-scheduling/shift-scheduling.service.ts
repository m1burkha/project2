import {Injectable} from '@angular/core';
import {FirestoreService} from '@services/firestore/firestore.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {IShiftSchedule} from '@domain-models/shift-scheduling/shift-schedule';
import moment = require('moment');

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

  getMonths(): string[] {
    return moment.months();
  }

  getDaysForMonth(month: string): number {
    const index = this.getMonths().indexOf(month);
    return moment({month: index}).daysInMonth();
  }

  getSelectedMonthIndex(month: string): number {
    return this.getMonths().indexOf(month);
  }

  getCurrentMonthName(): string {
    return this.getMonths()[moment().month()];
  }

  getCurrentMonthIndex(): number {
    return moment().month();
  }
}

