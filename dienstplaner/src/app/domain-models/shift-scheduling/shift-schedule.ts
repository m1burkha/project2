import {ShiftItem} from '@domain-models/shift-scheduling/shift-item';

/**
 * interface for the shift schedule */
export interface IShiftSchedule {
  /** id */
  id: string;
  /** date */
  shiftDate: Date;
  /** caption */
  caption: string;
  /** shift items */
  shiftItems: ShiftItem[];
}

export class ShiftSchedule implements IShiftSchedule {
  /** id */
  id: string;
  /** date */
  shiftDate: Date;
  /** caption */
  caption: string;
  /** shift items */
  shiftItems: ShiftItem[];

  /**
   * creates a new shift scheduling item
   * @param values arguments (id, shiftDate, caption, shiftItems[])
   */
  constructor(values: any = null) {
    this.id = '';
    Object.assign(this, values);
  }
}
