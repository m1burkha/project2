import {Component, OnInit, ViewChild} from '@angular/core';
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


const myTemplates: ShiftItem[] = [
  {
    'id': '10', 'caption': 'WorkingShift', 'type': ShiftType.workingShift, 'timeSpans': [
      {'id': '1', 'startTime': '07:00', 'endTime': '11:30', 'totalHours': 4.5, 'month': 2},
      {'id': '2', 'startTime': '12:30', 'endTime': '16:30', 'totalHours': 4, 'month': 2},
    ], 'totalHours': 8.5
  },
  {
    'id': '20', 'caption': 'Other', 'type': ShiftType.other, 'timeSpans': [
      {'id': '3', 'startTime': '09:00', 'endTime': '12:30', 'totalHours': 3.5, 'month': 2},
      {'id': '4', 'startTime': '13:30', 'endTime': '18:30', 'totalHours': 2, 'month': 2},
    ], 'totalHours': 5.5
  },
  {
    'id': '50',
    'caption': 'compensation',
    'type': ShiftType.compensation,
    'timeSpans': [],
    'totalHours': 3,
  },
  {
    'id': '60',
    'caption': 'Sick leave',
    'type': ShiftType.sickLeave,
    'timeSpans': [],
    'totalHours': 8.5,
  },
  {
    'id': '80',
    'caption': 'Vacation',
    'type': ShiftType.vacation,
    'timeSpans': [],
    'totalHours': 6.5,
  }
];
const shedules: ShiftSchedule[] = [
  {
    id: 'a',
    date: moment({month: 2, day: 12, year: 2018}).toDate(),
    // employeeId: '1FU8y4kVr6AQ8yP6vRX4',
    selectedShiftColumnOfEmployees: [{
      columnEmployeeId: '1FU8y4kVr6AQ8yP6vRX4',
      columnEmployeeCaption: 'Harry Hasler',
      shiftItem: {
        id: '10', caption: 'WorkingShift', type: ShiftType.workingShift, timeSpans: [
          {id: '1', startTime: '07:00', endTime: '11:30', totalHours: 4.5, month: 2},
          {id: '2', startTime: '12:30', endTime: '16:30', totalHours: 4, month: 2},
        ], totalHours: 8.5
      }
    }],
  },
  {
    id: 'b',
    date: moment(moment(), 'L').day(10).toDate(),
    // employeeId: '5MY69SV5cFEorxeGqtEa',
    selectedShiftColumnOfEmployees: [{
      columnEmployeeId: '5MY69SV5cFEorxeGqtEa',
      columnEmployeeCaption: 'Marco Polo',
      shiftItem: {
        id: '10', caption: 'WorkingShift', type: ShiftType.workingShift, timeSpans: [
          {id: '3', startTime: '09:00', endTime: '12:30', totalHours: 3, month: 2},
          {id: '4', startTime: '13:30', endTime: '18:30', totalHours: 2.5, month: 2},
        ], totalHours: 5.5
      }
    }],
  },
  {
    id: 'c', date: moment({month: 2, day: 14, year: 2018}).toDate(),
    // employeeId: '9kTDXHvzJoPHnBT6H0R7',
    selectedShiftColumnOfEmployees: [{
      columnEmployeeId: '9kTDXHvzJoPHnBT6H0R7',
      columnEmployeeCaption: 'Kollege Essig',
      shiftItem: {
        id: '10', caption: 'vacation', type: ShiftType.vacation, timeSpans: [
          {id: '5', startTime: '08:00', endTime: '12:00', totalHours: 2, month: 2},
          {id: '6', startTime: '13:00', endTime: '17:00', totalHours: 2.5, month: 2},
        ], totalHours: 4.5
      }
    }]
  },
  {
    id: 'd', date: moment({month: 6, day: 19, year: 2018}).toDate(),
    // employeeId: '5MY69SV5cFEorxeGqtEa',
    selectedShiftColumnOfEmployees: [{
      columnEmployeeId: '5MY69SV5cFEorxeGqtEa',
      columnEmployeeCaption: 'Markus Peterer',
      shiftItem: {
        id: '10', caption: 'WorkingShift', type: ShiftType.workingShift, timeSpans: [
          {id: '7', startTime: '07:00', endTime: '11:00', totalHours: 4, month: 2},
          {id: '8', startTime: '12:00', endTime: '15:00', totalHours: 3, month: 2},
        ], totalHours: 7
      }
    }]
  }];


@Component({
  selector: 'app-shift-scheduling',
  templateUrl: './shift-schedule.component.html',
  styleUrls: ['./shift-schedule.component.scss']
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
    this.months = moment.months();
    this.selectedMonth = moment().month(); // current month for selection by startup
    this.selectMonthRef.value = this.months[this.selectedMonth];
    const complete = zip(
      this.shiftTemplateService.readAll(),
      this.employeeService.readAll())
      .map(([templates, employees]: [ShiftItem[], Employee[]]) => {
        this.shiftTemplates = myTemplates; // templates
        this.employees = employees;
        this.totalEmployees = this.employees.length;
      })
      .subscribe(x => {
        this.createDefaultShifts(moment().month());
        this.refreshDataGrid();
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
   * Create default values for each day of the month.
   * The number of employees will determine the number of columns. Each column has a unique employeeId as a datafield
   * @param monthIndex, the month index
   * @returns void
   */
  createDefaultShifts(monthIndex: number): void {
    const shifts: ShiftSchedule[] = [];
    // populate the datagrid with default values
    for (let i = 1; i < moment().month(monthIndex).daysInMonth() + 1; i++) {
      const scheduleRow = new ShiftSchedule();
      scheduleRow.id = `${monthIndex}.${moment().year()}`;
      scheduleRow.date = moment({day: i, month: monthIndex, year: moment().year()}).toDate();
      scheduleRow.selectedShiftColumnOfEmployees = [];
      this.employees.map(employee => {
        const row = {
          columnEmployeeCaption: employee.caption,
          columnEmployeeId: employee.id,
          shiftItem: new ShiftItem({id: 0, caption: 'Select Shifts'}) // default shiftItem value
        };
        scheduleRow.selectedShiftColumnOfEmployees.push(row);
      });
      shifts.push(scheduleRow);
    }
    this.populateDatagridWithData(monthIndex, shifts);
  }

  /**
   * Retrieve data from the DB, filter to the chosen month and populate the datagrid
   * @param monthIndex
   */
  populateDatagridWithData(monthIndex: number, shifts: ShiftSchedule[]): void {
    // test data
    // shedules.map(shedule => {
    //   const currentRow = this.sheduleDataSource.find(row => {
    //     return row.date.getDate() === shedule.date.getDate();
    //   });
    //   const index = currentRow && currentRow.selectedShiftColumnOfEmployees.findIndex(
    //     columnIndex => columnIndex.columnEmployeeId === shedule.selectedShiftColumnOfEmployees[0].columnEmployeeId);
    //   if (index !== -1) {
    //     currentRow.selectedShiftColumnOfEmployees[index].shiftItem = shedule.selectedShiftColumnOfEmployees[0].shiftItem;
    //   }
    // });

    // uncomment to use backend service
    this.scheduleService.readAll().subscribe((monthlylist: ShiftSchedule[]) => {
      monthlylist.filter(shedule => {
        return shedule.hasOwnProperty(`${monthIndex}.${moment().year()}`);
      })
        .map(monthShedule => {
          monthShedule[`${monthIndex}.${moment().year()}`].shiftSchedules.map(shift => {

            const currentRow = shifts.find(row => {
              return row.date.getDate() === new Date(shift.date).getDate();
            });
            const shiftIndex = currentRow && currentRow.selectedShiftColumnOfEmployees.findIndex(
              columnIndex => columnIndex.columnEmployeeId === shift.selectedShiftColumnOfEmployees[0].columnEmployeeId);
            if (shiftIndex !== -1) {
              currentRow.selectedShiftColumnOfEmployees[shiftIndex].shiftItem = shift.selectedShiftColumnOfEmployees[0].shiftItem;
            }
          });
        });
    });
    this.sheduleDataSource = shifts;
  }

  /**
   * save only the rows where the shifts have been selected
   * prepare the schedule object, related to each employee column
   * @param event
   */
  onPrepareShiftsForSave(event) {
    const shiftSchedules: ShiftSchedule[] = [];
    const monthYear = `${this.selectedMonth}.${moment().year()}`;
    for (const [key, value] of Object.entries(event.newData)) {

      const selectedShiftItem = event.key.selectedShiftColumnOfEmployees.find(template => template.columnEmployeeId === key);
      const shiftSchedule = new ShiftSchedule();
      shiftSchedule.id = monthYear;
      shiftSchedule.date = event.key.date;
      shiftSchedule.selectedShiftColumnOfEmployees = [{
        columnEmployeeId: selectedShiftItem.columnEmployeeId,
        columnEmployeeCaption: selectedShiftItem.columnEmployeeCaption,
        shiftItem: selectedShiftItem.shiftItem
      }];
      shiftSchedules.push(shiftSchedule);
    }
    const employeeShift = {[monthYear]: {shiftSchedules}};
    console.log('saved shifts', (JSON.stringify(employeeShift)));
    this.storeSchedules(employeeShift);
  }

  /**
   * Sets the shift in the selected cell for that column
   * @param rowData, the row and cell new selected value to be set
   * @param value
   */
  onSetCellValue(rowData: any, value: any): void {
    (<any>this).defaultSetCellValue(rowData, value);
// this.defaultSetCellValue(rowData, value);
  }

  /**
   * On shift selection, set the required shift for the employee
   * @param evt, the event
   */
  onShiftChangeEvent(evt: any): void {
    evt.editorOptions.onValueChanged = (e: any) => {
      const shiftValue = evt.row.data.selectedShiftColumnOfEmployees.find(shift => shift.columnEmployeeId === evt.dataField);
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
   * Each row and colummn that is selected, the employee id is added to the selectedShiftColumnOfEmployees array,
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
            const columnValue = row.selectedShiftColumnOfEmployees.find(cell => cell.columnEmployeeId === column);
            if (columnValue && columnValue.shiftItem.type !== ShiftType.vacation &&
              columnValue.shiftItem.type !== ShiftType.publicHoliday) {
              acc = acc + columnValue.shiftItem.totalHours;
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
            const columnValue = row.selectedShiftColumnOfEmployees.find(cell => cell.columnEmployeeId === column);
            if (columnValue && columnValue.shiftItem.type === ShiftType.publicHoliday) {
              acc = acc + columnValue.shiftItem.totalHours;
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
            const columnValue = row.selectedShiftColumnOfEmployees.find(cell => cell.columnEmployeeId === column);
            if (columnValue && columnValue.shiftItem.type === ShiftType.vacation) {
              acc = acc + columnValue.shiftItem.totalHours;
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

  showEmployees() {
    this.router.navigateByUrl('/employees');
  }

  showShiftTemplates() {
    this.router.navigateByUrl('/shifttemplate');
  }

  storeSchedules(data: any) {
    if (data) {
      this.scheduleService.create(data);
    }
  }

  /**
   * The toolbar and components in the toolbar above the datagrid
   * @param e
   */
  onToolbarPreparing(e) {

    e.toolbarOptions.items.forEach((item, index) => {
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
        // icon: 'Employees',
        text: 'Mitarbeiter Profile',
        onClick: this.showEmployees.bind(this)
      },
    }, {
      location: 'before',
      widget: 'dxButton',
      options: {
        // icon: 'Employees',
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
