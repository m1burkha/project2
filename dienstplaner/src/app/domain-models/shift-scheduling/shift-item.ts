import {TimeSpan} from '@domain-models/shift-scheduling/time-span';
import {ShiftType} from '@domain-models/shift-scheduling/shift-type.enum';

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
}

/** class for the ShiftItem */
export class ShiftItem implements IShiftItem {
  /** id */
  id: string;
  /** shift timespans */
  timeSpans: TimeSpan[];
  /** totalhours */
  totalHours: number;
  /** Enum ShiftType */
  type: ShiftType;

  /** create a new shift item (constructor)
   * @param values (id, timeSpans[], totalHours, type (enum shiftType))
   */
  constructor(values: any = null) {
    this.id = '';
    Object.assign(this, values);
  }
}
