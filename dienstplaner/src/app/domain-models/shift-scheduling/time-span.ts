import {Time} from '@angular/common';

export interface ITimeSpan {
  /** id  */
  id: string;
  /** start time  */
  startTime: string;
  /** end time  */
  endTime: string;
  /** month */
  month: number;
  /** total hours  */
  totalHours: number;
}

export class TimeSpan implements ITimeSpan {
  /** id  */
  id: string;
  /** start time  */
  startTime: string;
  /** end time  */
  endTime: string;
  /** total hours  */
  get totalHours(): number {
    // return (this.endTime.hours - this.startTime.hours) + (this.endTime.minutes - this.startTime.minutes) / 60;
    return 0;
  }
  /** month */
  month: number;

  /** create a new Timespan (constructor)
   * @param values (id, startTime, endTime, totalHours)
   */
  constructor(values: any = null) {
    this.id = '';
    Object.assign(this, values);
  }
}
