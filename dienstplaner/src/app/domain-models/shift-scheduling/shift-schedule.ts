import {ShiftItem} from '@domain-models/shift-scheduling/shift-item';
import {Employee, IEmployee} from '@domain-models/employee/employee';

/**
 * interface for the shift schedule */
export interface IShiftSchedule {
  /** id */
  id: string;
  /** date */
  date: Date;
  /** shiftItem */
//  shiftItem: ShiftItem;
  /** employee Id */
//  employeeId: string;
  /** selectedShiftColumnOfEmployees */
  selectedShiftColumnOfEmployees: any[];
}

export class ShiftSchedule implements IShiftSchedule {
  /** id */
  id: string;
  /** date */
  date: Date;
  /** shiftItem */
  // shiftItem: ShiftItem;
  /** employee Id */
//  employeeId: string;
  /** selectedShiftColumnOfEmployees */
  selectedShiftColumnOfEmployees: any[];

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
}
