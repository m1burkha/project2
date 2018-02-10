import {TimeSpan} from '@domain-models/shift-scheduling/time-span';
import {ShiftType} from '@domain-models/shift-scheduling/shift-type.enum';
import {Employee} from '@domain-models/employee/employee';

/**
 * interface for the IShiftItems */
export interface IShiftItem {
  /** id */
  id: string;
  /** shift timespans */
  timeSpans: TimeSpan[];
  /** totalhours */
  totalHours: number;
  /** Enum ShiftType */
  type: ShiftType;
  /** employee */
  employeeId: string;
}

/** class for the ShiftItem */
export class ShiftItem implements IShiftItem {
  /** id */
  id: string;
  /** shift timespans */
  timeSpans: TimeSpan[];

  /** totalhours */
  get totalHours(): number {
    return this.timeSpans.map(e => e.totalHours).reduce((a, b) => {
      return a + b;
    });
  }

  /** Enum ShiftType */
  type: ShiftType;

  /** employee id */
  employeeId: string;

  /** create a new shift item (constructor)
   * @param values (id, timeSpans[], totalHours, type (enum shiftType))
   */
  constructor(values: any = null) {
    this.id = '';
    Object.assign(this, values);
  }
}
