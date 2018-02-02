import {Time} from '@angular/common';

export interface ITimeSpan {
  /** id  */
  id: string;
  /** start time  */
  startTime: Time;
  /** end time  */
  endTime: Time;
  /** total hours  */
  totalHours: number;
  /** month */
  month: string;
}

export class TimeSpan implements ITimeSpan {
  /** id  */
  id: string;
  /** start time  */
  startTime: Time;
  /** end time  */
  endTime: Time;
  /** total hours  */
  totalHours: number;
  /** month hours  */
  month: string;

  /** create a new Timespan (constructor)
   * @param values (id, startTime, endTime, totalHours)
   */
  constructor(values: any = null) {
    this.id = '';
    Object.assign(this, values);
  }
}
