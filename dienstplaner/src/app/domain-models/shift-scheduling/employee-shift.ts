/**
 * interface for the IEmployeeShift */
import {ShiftSchedule} from '@domain-models/shift-scheduling/shift-schedule';

export interface IEmployeeShift {
  /** row Id */
  id: string;
  /**The selected shiftSchedules to save / delete */
  shiftSchedules: ShiftSchedule[];
}

export class EmployeeShift {
  /** row Id */
  id: string;
  /**The selected shiftSchedules to save / delete */
  shiftSchedules: ShiftSchedule[];

  /**creates a list of the selected shifts per employee to delete / save
   * @param values arguments(id, shiftSchedules[])
   */
  constructor(values: any = null) {
    Object.assign(this, values);
    if (!this.shiftSchedules) {
      this.shiftSchedules = [];
    }
  }
}
