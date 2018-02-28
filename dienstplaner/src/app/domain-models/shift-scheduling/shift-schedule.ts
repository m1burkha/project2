import {ShiftItem} from '@domain-models/shift-scheduling/shift-item';
import {Employee, IEmployee} from '@domain-models/employee/employee';

/**
 * interface for the shift schedule */
export interface IShiftSchedule {
  /** id */
  id: string;
  /** date */
  shiftDate: Date;
  /** shiftItem */
  shiftItem: ShiftItem;
  /** employee Id */
  employeeId: string;
  /** selectedShiftColumnOfEmployees */
  selectedShiftColumnOfEmployees: string[];
}

export class ShiftSchedule implements IShiftSchedule {
  /** id */
  id: string;
  /** date */
  shiftDate: Date;
  /** shiftItem */
  shiftItem: ShiftItem;
  /** employee Id */
  employeeId: string;
  /** selectedShiftColumnOfEmployees */
  selectedShiftColumnOfEmployees: string[];

  /**
   * creates a new shift scheduling item
   * @param values arguments (id, shiftDate, caption, shiftItems[])
   */
  constructor(values: any = null) {
    this.id = '';
    Object.assign(this, values);
  }
}
