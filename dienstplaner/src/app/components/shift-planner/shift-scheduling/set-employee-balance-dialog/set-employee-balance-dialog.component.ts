import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EmployeeMonthBalance} from '@domain-models/employee-month-balance/employee-month-balance';
import {EmployeeMonthBalanceService} from '@services/employee-month-balance/employee-month-balance.service';

/**
 * dialog to set employee balance
 */
@Component({
  selector: 'app-set-employee-balance-dialog',
  templateUrl: './set-employee-balance-dialog.component.html',
  styleUrls: ['./set-employee-balance-dialog.component.scss']
})
export class SetEmployeeBalanceDialogComponent {
  public balances: EmployeeMonthBalance[];
  public possibleBalances: EmployeeMonthBalance[];

  /**
   * constructor
   * @param {MatDialogRef<SetEmployeeBalanceDialogComponent>} dialogRef
   * @param data
   */
  constructor(public dialogRef: MatDialogRef<SetEmployeeBalanceDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private employeeMonthBalanceService: EmployeeMonthBalanceService) {
    this.possibleBalances = data.possibleBalances;
    this.employeeMonthBalanceService
      .readAllBalances(this.possibleBalances[0].year.toString(), this.possibleBalances[0].month.toString())
      .subscribe(e => {
        this.balances = e === undefined || e === null ? [] : e;
        this.possibleBalances.forEach(b => {
          if (this.balances.map(m => m.employeeId).indexOf(b.employeeId) < 0) {
            this.balances.push(new EmployeeMonthBalance({
              employeeId: b.employeeId,
              employeeCaption: b.employeeCaption,
              year: b.year,
              month: b.month,
              hoursBalance: 0,
              vacationBalance: 0
            }));
          }
        });
      });
  }

  /**
   * gets the hours from possible balances
   * @param employeeId
   * @returns {string}
   */
  getHoursBalance(employeeId): string {
    return this.possibleBalances.find(e => e.employeeId === employeeId).hoursBalance.toFixed(2);
  }

  /**
   * get the vacation days from possible balances
   * @param employeeId
   * @returns {string}
   */
  getVacationBalance(employeeId): string {
    return this.possibleBalances.find(e => e.employeeId === employeeId).vacationBalance.toFixed(2);
  }

  /**
   * save
   */
  save() {
    this.balances.forEach(e => this.employeeMonthBalanceService.createBalance(e));
    this.dialogRef.close();
  }

  /**
   * cancel
   */
  cancel() {
    this.dialogRef.close();
  }

}
