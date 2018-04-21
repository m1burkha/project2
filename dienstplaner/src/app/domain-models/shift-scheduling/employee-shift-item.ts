import {IShiftItem} from '@domain-models/shift-scheduling/shift-item';

/** The EmployeeShiftItem interface */
export interface IEmployeeShiftItem {
  /** employee id */
  employeeId: string;
  /** shift item */
  shiftItem: IShiftItem;
}
/** The EmployeeShiftItem class */
export class EmployeeShiftItem implements IEmployeeShiftItem {
  /** employee id */
  employeeId: string;
  /** shift item */
  shiftItem: IShiftItem;

  /**
   * Constructor
   * @param obj
   */
  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
