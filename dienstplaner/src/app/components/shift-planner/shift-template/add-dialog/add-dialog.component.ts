import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSelectChange, MatSnackBar} from '@angular/material';
import {ShiftType} from '@domain-models/shift-scheduling/shift-type.enum';
import {ShiftItem} from '@domain-models/shift-scheduling/shift-item';
import {TimeSpan} from '@domain-models/shift-scheduling/time-span';

/**
 * AddDialogComponent component
 */
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
/** AddDialogComponent class */
export class AddDialogComponent {
  /** shift item */
  shiftItem: ShiftItem;
  /** availables times */
  hours: string[] = ['05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  /** availables times */
  minutes: string[] = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
  /** shift types */
  types = [
    {value: ShiftType.compensation, viewValue: 'Kompensation'},
    {value: ShiftType.military, viewValue: 'Militär'},
    {value: ShiftType.sickLeave, viewValue: 'Krankheit'},
    {value: ShiftType.studyLeave, viewValue: 'Aus- & Weiterbildung'},
    {value: ShiftType.vacation, viewValue: 'Urlaub'},
    {value: ShiftType.other, viewValue: 'Andere'},
    {value: ShiftType.workingShift, viewValue: 'Arbeitszeit'},
  ];

  /**
   * total hours calculated for all the shifts
   * @returns {number}
   */
  get totalHours(): number {
    return this.shiftItem ? this.shiftItem.timeSpans.reduce((a, b) => a + b.totalHours, 0) : 0;
  }

  /**
   * constructor
   * @param {MatDialogRef<AddDialogComponent>} dialogRef this dialog
   * @param data data for this dialog (nothing)
   */
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) {
    if (data && data instanceof ShiftItem) {
      this.shiftItem = new ShiftItem(data);
    } else {
      this.shiftItem = new ShiftItem({caption: '', type: ShiftType.workingShift, timeSpans: []});
      this.addTimeSpan();
    }
  }

  /**
   *caption changes by selection
   * @param event
   */
  captionChanged(event) {
    this.shiftItem.caption = event.target.value;
  }

  /**
   * get the hour from the string 07:00 - 12:00
   * @param {string} time
   * @returns {string}
   */
  getHour(time: string): string {
    return time ? time.substring(0, 2) : '05';
  }

  /**
   * sets the shift hours
   * @param {string} time
   * @param {MatSelectChange} event
   * @returns {string}
   */
  setHour(time: string, event: MatSelectChange): string {
    return event.value + (time ? time.substring(2) : ':00');
  }

  /**
   * get the shift minutes from string
   * @param {string} time
   * @returns {string}
   */
  getMinute(time: string): string {
    return time ? time.substring(3) : '00';
  }

  /**
   * set the shift minutes
   * @param {string} time
   * @param {MatSelectChange} event
   * @returns {string}
   */
  setMinute(time: string, event: MatSelectChange): string {
    return (time ? time.substring(0, 3) : '05:') + event.value;
  }

  /**
   * Add the shift time span {startTime} and {endTime}
   */
  addTimeSpan() {
    this.shiftItem.timeSpans.push(new TimeSpan({startTime: '07:00', endTime: '12:00'}));
  }

  /**
   * remove the shift time span
   * @param ts
   */
  removeTimeSpan(ts) {
    this.shiftItem.timeSpans.splice(this.shiftItem.timeSpans.indexOf(ts), 1);
  }

  /**
   * adds shift item
   */
  add(): void {
    this.dialogRef.close(this.shiftItem);
  }

  /**
   * on click on close button
   */
  onClick(): void {
    this.dialogRef.close();
  }

}
