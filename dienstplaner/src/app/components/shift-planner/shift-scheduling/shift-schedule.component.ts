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

@Component({
  selector: 'app-shift-scheduling',
  templateUrl: './shift-schedule.component.html',
  styleUrls: ['./shift-schedule.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShiftScheduleComponent implements OnInit {

  sheduleDataSource: ShiftSchedule[] = [];
  months: string[];
  employees: Employee[] = [];
  shiftTemplates: ShiftItem[];
  totalEmployees: number;
  selectedMonth: number;

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  @ViewChild('selectMonthRef') selectMonthRef: DxSelectBoxComponent;

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
              private router: Router) {
  }

  /** Initialise the shift schedule component variables / instances */
  ngOnInit() {
    moment.locale('de');
    this.months = moment.months();
    this.selectedMonth = moment().month(); // current month for selection by startup
    this.selectMonthRef.value = this.months[this.selectedMonth];
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
        this.createDefaultShifts(moment().month());
      });
  }

  /**
   * Select the shift month, create the default values, retrieve and filter the data from the service for that month
   * @param event , the selected month
   */
  filterMonthSelection(event): void {
    this.selectedMonth = this.months.findIndex(month => month === event.value);
    event.value = this.months[this.selectedMonth];
    this.createDefaultShifts(this.selectedMonth);
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
   * @param monthIndex, the month index
   * @returns void
   */
  createDefaultShifts(monthIndex: number): void {
    const shifts: ShiftSchedule[] = [];
    // populate the datagrid with default values
    for (let i = 1; i < moment().month(monthIndex).daysInMonth() + 1; i++) {
      const date = moment({year: moment().year(), month: monthIndex, day: i});
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
    this.populateDatagridWithData(monthIndex, shifts);
  }

  /**
   * Retrieve data from the DB, filter to the chosen month and populate the datagrid
   * @param {number} monthIndex
   * @param {ShiftSchedule[]} shifts
   */
  populateDatagridWithData(monthIndex: number, shifts: ShiftSchedule[]): void {
    this.scheduleService.readAllShifts(new Date((new Date).getFullYear(), monthIndex))
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
   * Calculates all the summary totals for Total hours, total public holidays, total holidays
   * Each row and colummn that is selected, the employee rowId is added to the selectedShiftColumnOfEmployees array,
   * the summaries are then calculated for each column selected or changed
   * @param options
   */
  calculateAllTotals(options) {
    const totalItemName = options.name.split(':');
    const summaryItems = options.component._options.summary.totalItems;
    const column = summaryItems.find(item => item.name === options.name).column;
    switch (totalItemName[0]) {

      case 'totalhours':
        if (options.summaryProcess === 'start' && column === totalItemName[1]) {
          options.totalValue = 0;
        }

        if (options.summaryProcess === 'finalize' && column === totalItemName[1]) {

          options.totalValue = options.component._options.dataSource.reduce((acc, row) => {
            const columnValue = row.selectedShiftColumnOfEmployees.find(cell => cell.employeeId === column);
            if (columnValue
              && columnValue.shiftItem.type !== ShiftType.vacation
              && columnValue.shiftItem.type !== ShiftType.publicHoliday
              && columnValue.shiftItem.timeSpans
              && columnValue.shiftItem.timeSpans.length) {
              acc = acc + columnValue.shiftItem.timeSpans.map(e => new TimeSpan(e)).reduce((a, b) => a + b.totalHours, 0);
            }
            return acc;
          }, 0);
        }
        break;

      case 'total-public-holidays':

        if (options.summaryProcess === 'start' && column === totalItemName[1]) {
          options.totalValue = 0;
        }

        if (options.summaryProcess === 'finalize' && column === totalItemName[1]) {

          options.totalValue = options.component._options.dataSource.reduce((acc, row) => {
            const columnValue = row.selectedShiftColumnOfEmployees.find(cell => cell.employeeId === column);
            if (columnValue
              && columnValue.shiftItem.type === ShiftType.publicHoliday
              && columnValue.shiftItem.timeSpans
              && columnValue.shiftItem.timeSpans.length) {
              acc = acc + columnValue.shiftItem.timeSpans.map(e => new TimeSpan(e)).reduce((a, b) => a + b.totalHours, 0);
            }
            return acc;
          }, 0);
        }
        break;

      case 'totalholidays':

        if (options.summaryProcess === 'start' && column === totalItemName[1]) {
          options.totalValue = 0;
        }

        if (options.summaryProcess === 'finalize' && column === totalItemName[1]) {

          options.totalValue = options.component._options.dataSource.reduce((acc, row) => {
            const columnValue = row.selectedShiftColumnOfEmployees.find(cell => cell.employeeId === column);
            if (columnValue
              && columnValue.shiftItem.type === ShiftType.vacation
              && columnValue.shiftItem.timeSpans
              && columnValue.shiftItem.timeSpans.length) {
              acc = acc + columnValue.shiftItem.timeSpans.map(e => new TimeSpan(e)).reduce((a, b) => a + b.totalHours, 0);
            }
            return acc;
          }, 0);
        }
        break;

      default:
        options.totalValue = 0;
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
          this.createDefaultShifts(this.selectedMonth); // reload after reverting
        };
      }
    });

    // controls on the toolbar
    e.toolbarOptions.items.unshift({
      location: 'before',
      template: 'totalGroupCount'
    }, {
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Mitarbeiter Profile',
        onClick: this.showEmployees.bind(this)
      },
    }, {
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'SchichtTemplates',
        onClick: this.showShiftTemplates.bind(this)
      },
    }, {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        onClick: this.refreshDataGrid.bind(this),
      },
    });
  }
}
