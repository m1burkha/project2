/**
 * enum for the various shift types
 * @constant in shift type (workingShift, vacationDay, sickLeave, military, studyleave, compensation, other)
 */
export enum ShiftType {
  /** type: working shift */
  workingShift, // 0
  /** type: vacation day */
  vacationDay, // 1
  /** type: sick leave */
  sickLeave, // 2
  /** type: military */
  military, // 3
  /** type: study leave */
  studyLeave, // 4
  /** type: compensation */
  compensation, // 5
  /** type: other */
  other // 6
}
