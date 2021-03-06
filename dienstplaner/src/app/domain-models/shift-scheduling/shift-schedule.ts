import {IShiftItem} from '@domain-models/shift-scheduling/shift-item';
import {EmployeeShiftItem} from '@domain-models/shift-scheduling/employee-shift-item';
import * as moment from 'moment';

/**
 * interface for the shift schedule */
export interface IShiftSchedule {
  /** id */
  id: string;
  /** date */
  date: Date;
  /** selectedShiftColumnOfEmployees */
  selectedShiftColumnOfEmployees: EmployeeShiftItem[];
}
/** ShiftSchedule class*/
export class ShiftSchedule implements IShiftSchedule {
  /** id */
  id: string;
  /** date */
  date: Date;
  /** selectedShiftColumnOfEmployees */
  selectedShiftColumnOfEmployees: EmployeeShiftItem[];

  /**
   * creates a new shift scheduling item
   * @param values arguments (id, shiftDate, captionControl, shiftItems[])
   */
  constructor(values: any = null) {
    this.id = '';
    if (!this.selectedShiftColumnOfEmployees) {
      this.selectedShiftColumnOfEmployees = [];
    }
    Object.assign(this, values);
  }

  /**
   * static method to create shiftschedule
   * @param {Date} date
   * @param {string} employeeId
   * @param {IShiftItem} shiftItem
   * @returns {ShiftSchedule}
   */
  static create(date: Date, employeeId: string, shiftItem: IShiftItem): ShiftSchedule {
    return new ShiftSchedule({
      id: moment(date).format('YYYY-MM-DD'),
      date: date,
      selectedShiftColumnOfEmployees: [ new EmployeeShiftItem({
        employeeId: employeeId,
        shiftItem: shiftItem
      })]
    });
  }
}
