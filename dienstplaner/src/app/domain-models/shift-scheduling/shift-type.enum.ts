/**
 * enum for the various shift types
 * @constant in shift type (workingShift, vacationDay, sickLeave, military, studyleave, compensation, other)
 */
export enum ShiftType {
  /** type: working shift */
  workingShift = <any>'workingShift', // 0
  /** type: vacation day */
  vacationDay = <any>'vactionDay', // 1
  /** type: sick leave */
  sickLeave = <any>'sickLeave', // 2
  /** type: military */
  military = <any>'military', // 3
  /** type: study leave */
  studyLeave = <any>'studyleave', // 4
  /** type: compensation */
  compensation = <any>'compensation', // 5
  /** type: other */
  other = <any>'other' // 6
}
