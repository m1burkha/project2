/**
 * enum for the various shift types
 * @constant in shift type (workingShift, vacationDay, sickLeave, military, studyleave, compensation, other)
 */
export enum ShiftType {
  /** type: working shift */
  workingShift = <any>'workingShift', // 0
  /** type: vacation day */
  vacation = <any>'vacation', // 1
  /** type: vacation day */
  publicHoliday = <any>'publicHoliday', // 2
  /** type: sick leave */
  sickLeave = <any>'sickLeave', // 3
  /** type: military */
  military = <any>'military', // 4
  /** type: study leave */
  studyLeave = <any>'studyleave', // 5
  /** type: compensation */
  compensation = <any>'compensation', // 6
  /** type: other */
  other = <any>'other' // 7
}
