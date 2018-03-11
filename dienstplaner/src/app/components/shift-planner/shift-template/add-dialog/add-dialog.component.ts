import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ShiftType} from '@domain-models/shift-scheduling/shift-type.enum';
import {ShiftItem} from '@domain-models/shift-scheduling/shift-item';

/**
 * add dialog
 */
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent {
  /** captionControl form control */
  captionControl: FormControl = new FormControl('', [Validators.required]);
  /** type selection form control */
  typeControl = new FormControl('', [Validators.required]);
  /** form group */
  form: FormGroup;
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
   * error message for wrong captionControl
   * @returns {string | string | string}
   */
  getCaptionErrorMessage() {
    return this.captionControl.hasError('required') ? 'You must enter a value' :
      this.captionControl.hasError('captionControl') ? 'Not a valid captionControl' :
        '';
  }

  /**
   * error message for wrong type
   * @returns {string | string | string}
   */
  getTypeErrorMessage() {
    return this.typeControl.hasError('required') ? 'You must enter a value' :
      this.typeControl.hasError('type') ? 'Not a valid type' :
        '';
  }

  /**
   * constructor
   * @param {MatDialogRef<AddDialogComponent>} dialogRef this dialog
   * @param data data for this dialog (nothing)
   */
  constructor(public dialogRef: MatDialogRef<AddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar) {
    this.form = formBuilder.group({
      captionControl: this.captionControl,
      typeControl: this.typeControl
    });
  }

  /**
   * adds item
   */
  add(): void {
    this.dialogRef.close(new ShiftItem({type: this.typeControl.value, caption: this.captionControl.value}));
  }

  /**
   * on click on close button
   */
  onClick(): void {
    this.dialogRef.close();
  }

}
