import {IShiftItem} from '@domain-models/shift-scheduling/shift-item';

export interface IEmployeeShiftItem {
  employeeId: string;
  shiftItem: IShiftItem;
}

export class EmployeeShiftItem implements IEmployeeShiftItem {
  employeeId: string;
  shiftItem: IShiftItem;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
