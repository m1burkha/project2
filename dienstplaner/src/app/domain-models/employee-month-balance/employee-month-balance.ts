/**
 * saldi per month of an employee
 */
export interface IEmployeeMonthBalance {
  /** id */
  id: string;
  /** employee id */
  employeeId: string;
  /** employee caption */
  employeeCaption: string;
  /** year */
  year: number;
  /** month */
  month: number;
  /** hours balance */
  hoursBalance: number;
  /** vacation days balance */
  vacationBalance: number;
  /** absence days balance */
  absenceBalance: number;
}

/**
 * saldi per month of an employee
 */
export class EmployeeMonthBalance implements IEmployeeMonthBalance {
  /** id */
  id: string;
  /** employee id */
  employeeId: string;
  /** employee caption */
  employeeCaption: string;
  /** year */
  year: number;
  /** month */
  month: number;
  /** hours balance */
  hoursBalance: number;
  /** vacation days balance */
  vacationBalance: number;
  /** absence days balance */
  absenceBalance: number;

  /**
   * creates a new employee month balance
   * @param values values (id, employeeId, employeeCaption, year, month, hoursBalance, vacationBalance, absenceBalance)
   */
  constructor(values: any = null) {
    this.id = values.employeeId;
    Object.assign(this, values);
  }
}
