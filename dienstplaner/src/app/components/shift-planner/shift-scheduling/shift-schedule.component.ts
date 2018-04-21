import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DxDataGridComponent, DxSelectBoxComponent} from 'devextreme-angular';
import {ShiftSchedule} from '@domain-models/shift-scheduling/shift-schedule';
import {ShiftScheduleService} from '@services/shift-scheduling/shift-scheduling.service';
import {ShiftItem} from '@domain-models/shift-scheduling/shift-item';
import {ShiftType} from '@domain-models/shift-scheduling/shift-type.enum';
import {Employee} from '@domain-models/employee/employee';
import {EmployeeService} from '@services/employee/employee.service';
import * as moment from 'moment';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/reduce';
import {Router} from '@angular/router';
import {ShiftItemsService} from '@services/shift-items/shift-items.service';
import {zip} from 'rxjs/observable/zip';
import {EmployeeShiftItem} from '@domain-models/shift-scheduling/employee-shift-item';
import {TimeSpan} from '@domain-models/shift-scheduling/time-span';
import {EmployeeMonthBalance} from '@domain-models/employee-month-balance/employee-month-balance';
import {MatDialog} from '@angular/material';
import {SetEmployeeBalanceDialogComponent} from '@components/shift-planner/shift-scheduling/set-employee-balance-dialog/set-employee-balance-dialog.component';
import {EmployeeMonthBalanceService} from '@services/employee-month-balance/employee-month-balance.service';

/** The ShiftSchedule component */
@Component({
  selector: 'app-shift-scheduling',
  templateUrl: './shift-schedule.component.html',
  styleUrls: ['./shift-schedule.component.scss'],
  encapsulation: ViewEncapsulation.None
})
/** The ShiftSchedule class */
export class ShiftScheduleComponent implements OnInit {

  /** the schedule datasource for the grid */
  sheduleDataSource: ShiftSchedule[] = [];
  /** years holder for the year drop down */
  years: number[];
  /** months holder for the month drop down */
  months: string[];
  /** the list of employees, displays all the columns in the datagrid */
  employees: Employee[] = [];
  /** template holder for all the templates created */
  shiftTemplates: ShiftItem[];
  /**
   * balances from month before
   */
  employeeMonthBalances: EmployeeMonthBalance[];
  /** total amount of employees, displayed tin the toolbar */
  totalEmployees: number;
  /** the year selected from the dropdown */
  selectedYear: number;
  /** the month selected from the dropdown */
  selectedMonth: number;

  /** selected date (1. of month) */
  get selectedDate(): Date {
    return moment({year: this.selectedYear, month: this.selectedMonth, day: 1}).toDate();
  }

  /** reference to the datagrid component */
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  /** reference to the month select component */
  @ViewChild('selectMonthRef') selectMonthRef: DxSelectBoxComponent;
  /** reference to the year select component */
  @ViewChild('selectYearRef') selectYearRef: DxSelectBoxComponent;

  /**
   * Constructor
   * @param {ShiftScheduleService} scheduleService
   * @param {EmployeeService} employeeService
   * @param {ShiftItemsService} shiftTemplateService
   * @param {Router} router
   */
  constructor(private scheduleService: ShiftScheduleService,
              private employeeService: EmployeeService,
              private shiftTemplateService: ShiftItemsService,
              private employeeMonthBalanceService: EmployeeMonthBalanceService,
              private router: Router,
              private dialog: MatDialog) {
  }

  /** Initialise the shift schedule component variables / instances */
  ngOnInit() {
    moment.locale('de');
    this.months = moment.months();
    this.selectedMonth = moment().month(); // current month for selection by startup
    this.selectMonthRef.value = this.months[this.selectedMonth];

    this.years = [];
    for (let i = 2017; i <= moment().year() + 1; i++) {
      this.years.push(i);
    }
    this.selectedYear = this.years[this.years.length - 2]; // current year for selection by startup
    this.selectYearRef.value = this.years[this.years.length - 2];

    zip(
      this.shiftTemplateService.readAll(),
      this.employeeService.readAll())
      .map(([templates, employees]: [ShiftItem[], Employee[]]) => {
        templates.push(new ShiftItem({caption: '', timeSpans: []}));
        this.shiftTemplates = templates.sort((a, b) => (a.caption > b.caption ? 1 : -1)).sort((a, b) => (a.type < b.type ? 1 : -1)).map(e => new ShiftItem(e));
        this.employees = employees;
        this.totalEmployees = this.employees.length;
      })
      .subscribe(() => {
        this.createDefaultShifts();
      });

    const monthBefore = moment(this.selectedDate).subtract(1, 'months');
    this.employeeMonthBalanceService
      .readAllBalances(monthBefore.year().toString(), monthBefore.month().toString())
      .subscribe(e => this.employeeMonthBalances = e);
  }

  /**
   * Select the shift month, create the default values, retrieve and filter the data from the service for that month
   * @param event , the selected month
   */
  filterMonthSelection(event): void {
    this.selectedMonth = this.months.findIndex(month => month === event.value);
    event.value = this.months[this.selectedMonth];
    this.createDefaultShifts();
  }

  /**
   * Select the shift year, create the default values, retrieve and filter the data from the service for that year
   * @param event , the selected year
   */
  filterYearSelection(event): void {
    this.selectedYear = event.value;
    this.createDefaultShifts();
  }

  /**
   * sets the text/caption in the datagrid cell from the datasource
   * @param rowData
   * @returns {any}
   */
  setCellFromDatasource(rowData) {
    const column = this as any;
    const col = rowData.selectedShiftColumnOfEmployees.find(currentColumn => currentColumn.employeeId === column.dataField);
    return col.shiftItem.caption;
  }

  /**
   * date format for the date column in the datagrid, eg: column Datumn Mo, 02.04.2018
   * @param rowData
   * @returns {string}
   */
  getFormattedDate(rowData) {
    return moment(rowData.date).format('dd, DD.MM.YYYY');
  }

  /**
   * sets the caption (employee name) for each employee column
   * @param employeeId
   * @returns {string}
   */
  getEmployeeCaption(employeeId): string {
    return this.employees.find(x => x.id === employeeId).caption;
  }

  /**
   * Create default values for each day of the month.
   * The number of employees will determine the number of columns. Each column has a unique employeeId as a datafield
   * @returns void
   */
  createDefaultShifts(): void {
    const shifts: ShiftSchedule[] = [];
    const first = moment({year: this.selectedYear, month: this.selectedMonth, date: 1});
    // populate the datagrid with default values
    for (let i = 0; i < first.daysInMonth(); i++) {
      const date = moment(first).add(i, 'days');
      const scheduleRow = new ShiftSchedule();
      scheduleRow.id = date.format('YYYY-MM-DD');
      scheduleRow.date = date.toDate();
      scheduleRow.selectedShiftColumnOfEmployees = [];
      this.employees.map(employee => {
        const row = new EmployeeShiftItem({
          employeeId: employee.id,
          shiftItem: {
            caption: '', // default shiftItem value
            timeSpans: []
          }
        });
        scheduleRow.selectedShiftColumnOfEmployees.push(row);
      });
      shifts.push(scheduleRow);
    }
    this.populateDatagridWithData(shifts);

    const monthBefore = moment(this.selectedDate).subtract(1, 'months');
    this.employeeMonthBalanceService
      .readAllBalances(monthBefore.year().toString(), monthBefore.month().toString())
      .subscribe(e => this.employeeMonthBalances = e);
  }

  /**
   * Retrieve data from the DB, filter to the chosen month and populate the datagrid
   * @param {ShiftSchedule[]} shifts
   */
  populateDatagridWithData(shifts: ShiftSchedule[]): void {
    this.scheduleService.readAllShifts(moment().year(this.selectedYear).month(this.selectedMonth).toDate())
      .subscribe((monthlylist: ShiftSchedule[]) => {
        monthlylist
          .forEach(dayShedule => {
            const currentDay = shifts.find(row => moment(dayShedule.date).toDate().getDate() === row.date.getDate());
            if (currentDay) {
              dayShedule.selectedShiftColumnOfEmployees.forEach(x => {
                Object.assign(currentDay.selectedShiftColumnOfEmployees.find(e => e.employeeId === x.employeeId), x);
              });
            }
          });
        this.sheduleDataSource = shifts;
      });
  }

  /**
   * save only the rows where the shifts have been selected
   * prepare the schedule object, related to each employee column
   * @param event
   */
  onPrepareShiftsForSave(event) {
    this.scheduleService.updateShift(event.key);
  }

  /**
   * Sets the shift in the selected cell for that column
   * @param rowData, the row and cell of the new selection
   * @param value, the value to set
   */
  onSetCellValue(rowData: any, value: any): void {
    (<any>this).defaultSetCellValue(rowData, value);
  }

  /**
   * On shift selection, set the required shift for the employee
   * @param evt, the event
   */
  onShiftChangeEvent(evt: any): void {
    evt.editorOptions.onValueChanged = (e: any) => {
      const shiftValue = evt.row.data.selectedShiftColumnOfEmployees.find(shift => shift.employeeId === evt.dataField);
      const shiftTemplate = this.shiftTemplates.find(template => template.id === e.value);
      if (shiftValue) {
        shiftValue.shiftItem = shiftTemplate;
      }
      evt.setValue(e.value);
      this.dataGrid.instance.refresh();
    };
  }

  /**
   * gets the employee by id
   * @param {string} employeeId
   * @returns {Employee} employee
   */
  getEmployee(employeeId: string): Employee {
    return this.employees.find(e => e.id === employeeId);
  }

  /**
   * gets the employee month balance of the month before
   * @param {string} employeeId
   * @returns {EmployeeMonthBalance}
   */
  getEmployeeBalance(employeeId: string): EmployeeMonthBalance {
    const result = this.employeeMonthBalances.find(e => e.employeeId === employeeId);
    return result === undefined ? new EmployeeMonthBalance({
      employeeId: employeeId,
      hoursBalance: 0,
      vacationBalance: 0
    }) : result;
  }

  /**
   * gets the monthly hours an employee has to work
   * @param {string} employeeId
   * @returns {number} hours
   */
  getEmployeeMonthHours(employeeId: string): number {
    const employee = this.getEmployee(employeeId);
    return moment({month: this.selectedMonth}).daysInMonth() * (employee.weekHours / 7) * (employee.workLoad / 100) - this.getEmployeeBalance(employeeId).hoursBalance;
  }

  /**
   * gets the amount of vacation days an employee has per month
   * @param {string} employeeId
   * @returns {number} days
   */
  getEmployeeMonthVacation(employeeId: string): number {
    const employee = this.getEmployee(employeeId);
    return moment({month: this.selectedMonth}).daysInMonth() * (employee.vacationDays / 365) + this.getEmployeeBalance(employeeId).vacationBalance;
  }

  /**
   * gets all shift items of an employee
   * @param {string} employeeId
   * @returns {ShiftItem[]} shiftitems
   */
  getShifts(employeeId: string): ShiftItem[] {
    return this.sheduleDataSource
      .map(e => e.selectedShiftColumnOfEmployees.find(f => f.employeeId === employeeId).shiftItem);
  }

  /**
   * gets the planned working hours of an employee
   * @param {string} employeeId
   * @returns {number} hours
   */
  getShiftWorkingHours(employeeId: string): number {
    const shifts = this.getShifts(employeeId);
    return shifts.reduce((a, b) => a + (b && b.timeSpans && b.timeSpans.length > 0 ?
      b.timeSpans.map(e => new TimeSpan(e)).reduce((c, d) => c + d.totalHours, 0) :
      0), 0);
  }

  /**
   * gets the amount of days of certain types of an employee
   * @param {string} employeeId
   * @param {ShiftType[]} shiftTypes
   * @returns {number} days
   */
  getShiftdaysByType(employeeId: string, shiftTypes: ShiftType[]): number {
    const shifts = this.getShifts(employeeId);
    return shifts.reduce((a, b) => a + (b && shiftTypes.indexOf(b.type) >= 0 ? 1 : 0), 0);
  }

  /**
   * gets the amount of vacation days of an employee
   * @param {string} employeeId
   * @returns {number} days
   */
  getShiftHolidays(employeeId: string): number {
    return this.getShiftdaysByType(employeeId, [ShiftType.publicHoliday, ShiftType.vacation]);
  }

  /**
   * gets the amount of absence days of an employee
   * @param {string} employeeId
   * @returns {number} days
   */
  getShiftAbsences(employeeId: string): number {
    return this.getShiftdaysByType(employeeId, [ShiftType.military, ShiftType.studyLeave, ShiftType.sickLeave, ShiftType.other]);
  }

  /**
   * Each row and colummn that is selected, the employee rowId is added to the selectedShiftColumnOfEmployees array,
   * the summaries are then calculated for each column selected or changed
   * @param options
   */
  calculateAllTotals = (options) => {
    const totalItemName = options.name.split(':');
    options.totalValue = options.summaryProcess === 'finalize' ? this.getTotalValuesByEmployee(totalItemName[0], totalItemName[1]).toFixed(2) : '0.00';
  }

  /**
   * Calculates all the summary totals for Total hours, total public holidays, total holidays
   * @param type hours or days
   * @param employeeId employee id
   */
  getTotalValuesByEmployee(type: string, employeeId: string): number {
    switch (type) {

      case 'monthhours':
        const employee = this.getEmployee(employeeId);
        const dailyHours = employee.weekHours / 5 * employee.workLoad / 100;
        return (this.getEmployeeMonthHours(employeeId) - (this.getShiftHolidays(employeeId) + this.getShiftAbsences(employeeId)) * dailyHours);

      case'totalhours':
        return this.getShiftWorkingHours(employeeId);

      case 'totalholidays':
        return (this.getEmployeeMonthVacation(employeeId) - this.getShiftHolidays(employeeId));

      case 'totalabsences':
        return this.getShiftAbsences(employeeId);

      default:
        return 0;
    }
  }

  /** refresh the current schedule datagrid */
  refreshDataGrid() {
    this.dataGrid.instance.refresh();
  }

  /**
   * navigation button (Mitarbeiter profile), navigates to the employees grid
   */
  showEmployees() {
    this.router.navigateByUrl('/employees');
  }

  /**
   * navigation button (Schicht Templates), navigates to the shift template grid
   */
  showShiftTemplates() {
    this.router.navigateByUrl('/shifttemplate');
  }

  /**
   * The toolbar and components in the toolbar above the datagrid
   * @param e, which component event has been clicked
   */
  onToolbarPreparing(e) {

    e.toolbarOptions.items.forEach((item) => {
      if (item.name === 'revertButton') {
        item.options.onClick = (x) => {
          this.dataGrid.instance.cancelEditData();
          this.createDefaultShifts(); // reload after reverting
        };
      }
    });
  }

  /**
   * opens balance dialog
   */
  setBalance() {
    const possibleBalances: EmployeeMonthBalance[] = this.employees.map(employee => new EmployeeMonthBalance({
      employeeId: employee.id,
      employeeCaption: employee.caption,
      year: moment().year(),
      month: this.selectedMonth,
      hoursBalance: this.getTotalValuesByEmployee('totalhours', employee.id) - this.getTotalValuesByEmployee('monthhours', employee.id),
      vacationBalance: this.getTotalValuesByEmployee('totalholidays', employee.id),
      absenceBalance: this.getTotalValuesByEmployee('totalabsences', employee.id)
    }));
    const dialogRef = this.dialog.open(SetEmployeeBalanceDialogComponent, {
      data: { possibleBalances: possibleBalances }
    });
  }
}
