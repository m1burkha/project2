
export interface ITimeSpan {
  /** start time  */
  startTime: string;
  /** end time  */
  endTime: string;
  /** total hours  */
  totalHours: number;
}

export class TimeSpan implements ITimeSpan {
  /** start time  */
  startTime: string;
  /** end time  */
  endTime: string;
  /** total hours  */
  get totalHours(): number {
    const hours = +(this.endTime.substring(0, 2) || 0) - +(this.startTime.substring(0, 2) || 0);
    const minutes = +(this.endTime.substring(3) || 0) - +(this.startTime.substring(3) || 0);

    return hours + minutes / 60;
  }

  /** create a new Timespan (constructor)
   * @param values (id, startTime, endTime, totalHours)
   */
  constructor(values: any = null) {
    Object.assign(this, values);
  }
}
