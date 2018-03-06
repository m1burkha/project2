import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DxDataGridComponent} from 'devextreme-angular';
import {IShiftSchedule, ShiftSchedule} from '@domain-models/shift-scheduling/shift-schedule';
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
import DevExpress from 'devextreme/bundles/dx.all';

const mySource: ShiftItem[] = [
  {
    'id': '10', 'caption': 'WorkingShift', 'type': ShiftType.workingShift, 'timeSpans': [
      {'id': '1', 'startTime': '07:00', 'endTime': '11:30', 'totalHours': 4.5, 'month': 2},
      {'id': '2', 'startTime': '12:30', 'endTime': '16:30', 'totalHours': 4, 'month': 2},
    ], 'totalHours': 8.5
  },
  {
    'id': '20', 'caption': 'Other', 'type': ShiftType.other, 'timeSpans': [
      {'id': '3', 'startTime': '09:00', 'endTime': '12:30', 'totalHours': 3.5, 'month': 2},
      {'id': '4', 'startTime': '13:30', 'endTime': '18:30', 'totalHours': 5, 'month': 2},
    ], 'totalHours': 8.5
  },
  {
    'id': '50',
    'caption': 'Compensation',
    'type': ShiftType.compensation,
    'timeSpans': [],
    'totalHours': 8.5,
    // tooltip_totalHours: 'benötigt Stunden, da diese als Soll-Stunden hinzugefügt werden'
  },
  {
    'id': '60',
    'caption': 'Sick leave',
    'type': ShiftType.sickLeave,
    'timeSpans': [],
    'totalHours': 8.5,
    // tooltip_totalHours: 'benötigt Stunden, da diese als Ist-Stunden abgezogen werden'
  }
];

// const schedules = Observable.from([
//   {
//     id: 'a',
//     shiftDate: moment({month: 1, day: 12, year: 2018}).toDate(),
//     employees: [
//       {id: '1FU8y4kVr6AQ8yP6vRX4', caption: 'Larry 1', department: 'IT', weekHours: 12, workLoad: 100, vacationDays: 14},
//       //   {id: '5MY69SV5cFEorxeGqtEa', caption: 'Dirty Harry', department: 'Finance', weekHours: 12, workLoad: 100, vacationDays: 14},
//       //   {id: '9kTDXHvzJoPHnBT6H0R7', caption: 'Silver White', department: 'IT', weekHours: 12, workLoad: 100, vacationDays: 14}
//     ],
//     shiftItem: {
//       id: '10', caption: 'WorkingShift', type: ShiftType.workingShift, timeSpans: [
//         {id: '1', startTime: '07:00', endTime: '11:30', totalHours: 4.5, month: 2},
//         {id: '2', startTime: '12:30', endTime: '16:30', totalHours: 4, month: 2},
//       ], totalHours: 8.5
//     }
//   },
//   {
//     id: 'b', shiftDate: moment(moment(), 'L').day(10).toDate(),
//     employees: [{id: '1FU8y4kVr6AQ8yP6vRX4', caption: 'Larry 1', department: 'IT', weekHours: 12, workLoad: 100, vacationDays: 14},
//       {id: '5MY69SV5cFEorxeGqtEa', caption: 'Dirty Harry', department: 'Finance', weekHours: 12, workLoad: 100, vacationDays: 14},
//       {id: '9kTDXHvzJoPHnBT6H0R7', caption: 'Silver White', department: 'IT', weekHours: 12, workLoad: 100, vacationDays: 14}],
//     shiftItem: {
//       id: '20', caption: 'WorkingShift', type: ShiftType.workingShift, timeSpans: [
//         {id: '3', startTime: '09:00', endTime: '12:30', totalHours: 3.5, month: 2},
//         {id: '4', startTime: '13:30', endTime: '18:30', totalHours: 5, month: 2},
//       ], totalHours: 8.5
//     }
//   },
//   {
//     id: 'c', shiftDate: moment({month: 5, day: 12, year: 2018}).toDate(),
//     employees: [{id: '1FU8y4kVr6AQ8yP6vRX4', caption: 'Larry 1', department: 'IT', weekHours: 12, workLoad: 100, vacationDays: 14},
//       {id: '5MY69SV5cFEorxeGqtEa', caption: 'Dirty Harry', department: 'Finance', weekHours: 12, workLoad: 100, vacationDays: 14},
//       {id: '9kTDXHvzJoPHnBT6H0R7', caption: 'Silver White', department: 'IT', weekHours: 12, workLoad: 100, vacationDays: 14}],
//     shiftItem: {
//       id: '30', caption: 'WorkingShift', type: ShiftType.workingShift, timeSpans: [
//         {id: '5', startTime: '08:00', endTime: '12:00', totalHours: 4, month: 2},
//         {id: '6', startTime: '13:00', endTime: '17:00', totalHours: 4.5, month: 2},
//       ], totalHours: 8.5
//     }
//   },
//   {
//     id: 'd', shiftDate: moment({month: 6, day: 19, year: 2018}).toDate(),
//     employees: [{id: '1FU8y4kVr6AQ8yP6vRX4', caption: 'Larry 1', department: 'IT', weekHours: 12, workLoad: 100, vacationDays: 14},
//       {id: '5MY69SV5cFEorxeGqtEa', caption: 'Dirty Harry', department: 'Finance', weekHours: 12, workLoad: 100, vacationDays: 14},
//       {id: '9kTDXHvzJoPHnBT6H0R7', caption: 'Silver White', department: 'IT', weekHours: 12, workLoad: 100, vacationDays: 14}],
//     shiftItem: {
//       id: '40', caption: 'WorkingShift', type: ShiftType.workingShift, timeSpans: [
//         {id: '7', startTime: '07:00', endTime: '11:00', totalHours: 4, month: 2},
//         {id: '8', startTime: '12:00', endTime: '15:00', totalHours: 3, month: 2},
//       ], totalHours: 7
//     }
//   },
// ]);


const schedules = Observable.from([
  {
    id: 'a',
    shiftDate: moment({month: 1, day: 12, year: 2018}).toDate(),
    employeeId: '1FU8y4kVr6AQ8yP6vRX4',
    selectedShiftColumnOfEmployees: [],
    shiftItem: {
      id: '10', caption: 'WorkingShift', type: ShiftType.workingShift, timeSpans: [
        {id: '1', startTime: '07:00', endTime: '11:30', totalHours: 4.5, month: 2},
        {id: '2', startTime: '12:30', endTime: '16:30', totalHours: 4, month: 2},
      ], totalHours: 8.5
    }
  },
  {
    id: 'b', shiftDate: moment(moment(), 'L').day(10).toDate(),
    employeeId: '5MY69SV5cFEorxeGqtEa',
    selectedShiftColumnOfEmployees: [],
    shiftItem: {
      id: '10', caption: 'WorkingShift', type: ShiftType.workingShift, timeSpans: [
        {id: '3', startTime: '09:00', endTime: '12:30', totalHours: 3, month: 2},
        {id: '4', startTime: '13:30', endTime: '18:30', totalHours: 2.5, month: 2},
      ], totalHours: 5.5
    }
  },
  {
    id: 'c', shiftDate: moment({month: 1, day: 14, year: 2018}).toDate(),
    employeeId: '9kTDXHvzJoPHnBT6H0R7',
    selectedShiftColumnOfEmployees: [],
    shiftItem: {
      id: '10', caption: 'WorkingShift', type: ShiftType.workingShift, timeSpans: [
        {id: '5', startTime: '08:00', endTime: '12:00', totalHours: 2, month: 2},
        {id: '6', startTime: '13:00', endTime: '17:00', totalHours: 2.5, month: 2},
      ], totalHours: 4.5
    }
  },
  {
    id: 'd', shiftDate: moment({month: 6, day: 19, year: 2018}).toDate(),
    employeeId: '5MY69SV5cFEorxeGqtEa',
    selectedShiftColumnOfEmployees: [],
    shiftItem: {
      id: '10', caption: 'WorkingShift', type: ShiftType.workingShift, timeSpans: [
        {id: '7', startTime: '07:00', endTime: '11:00', totalHours: 4, month: 2},
        {id: '8', startTime: '12:00', endTime: '15:00', totalHours: 3, month: 2},
      ], totalHours: 7
    }
  },
]);


@Component({
  selector: 'app-shift-scheduling',
  templateUrl: './shift-schedule.component.html',
  styleUrls: ['./shift-schedule.component.scss']
})
export class ShiftScheduleComponent implements OnInit {

  sheduleList: Observable<IShiftSchedule[]>;
  totalCount: number;
  shiftItems: ShiftItem[] = [];
  months: string[];
  month: number;
  monthName: string;
  year: number;
  daysOfMonth: number;
  employees: Employee[] = [];
  templates: ShiftItem[];
  totalEmployees: number;

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  /**
   * Constructor
   * @param {ShiftScheduleService} scheduleService
   * @param {EmployeeService} employeeService
   * * @param {Router} router
   */
  constructor(private scheduleService: ShiftScheduleService,
              private employeeService: EmployeeService,
              private router: Router) {
    // this.setShiftValue = this.setShiftValue.bind(this);
  }

  /** Initialise the shift schedule component variables / instances */
  ngOnInit() {
    this.months = moment.months();
    this.month = moment().month(); // current month
    this.monthName = this.months[this.month]; // current month by name
    this.daysOfMonth = this.getDaysForMonth(this.monthName);
    this.year = moment().year(); // current year
    this.templates = mySource;
    this.sheduleList = this.createMonthlyShifts(this.month);
  }

  /**
   * Filters the shifts that the user has selected
   * @param event , the selected month
   */
  filterMonthSelection(event): void {
    this.daysOfMonth = this.getDaysForMonth(event.value);
    this.month = this.getMonthIndex(event.value);
    this.sheduleList = this.createMonthlyShifts(this.month);
  }

  /**
   * Filters the current or selected month to display. If no shift list is avaiable a new
   * shift schedule is create for that month
   * @param month
   * @returns {Observable<IShiftSchedule[]>}
   */
  createMonthlyShifts(month: any): Observable<IShiftSchedule[]> {

    const shifts: any[] = [];
    this.employeeService.readAll().forEach(emp => {
      this.employees = emp;
      this.totalEmployees = emp.length;
    });

    if (month) {
      const monthIndex = (typeof month === 'number') ? month : this.months.indexOf(month);
      //  return this.scheduleService.readAll().reduce((acc, item) => {
      return schedules.reduce((acc, item) => {
        if (item.shiftDate.getMonth() === month) {
          acc.push(item);
        }
        return acc;
      }, [])
        .switchMap(monthlyShift => {
          if (monthlyShift.length >= 28 && monthlyShift.length <= 31) {
            return Observable.of(monthlyShift);
          }
          for (let i = 1; i < this.daysOfMonth + 1; i++) {
            const schedule = new ShiftSchedule();
            schedule.id = `${month}.${this.year}`;
            schedule.shiftDate = moment({day: i, month: month, year: this.year}).toDate();
            schedule.shiftItem = new ShiftItem();
            schedule.selectedShiftColumnOfEmployees = [];
            shifts.push(schedule);
          }
          return Observable.of(shifts);
        });
    }
  }

  onPrepareShiftsForSave(event) {
    console.log('save row event', event);
    // this.dataGrid.instance.saveEditData();
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
      console.log('valueChanged', e);
      const selectedEmp = evt.row.data.selectedShiftColumnOfEmployees.find(emp => emp === evt.dataField);
      if (!selectedEmp) {
        evt.row.data.selectedShiftColumnOfEmployees.push(evt.dataField);
      }
      evt.row.data.employeeId = evt.dataField;
      const shift = this.templates.find(template => {
        return template.id === e.value;
      });
      evt.row.data.shiftItem = shift;
      evt.row.cells[evt.index].value = e.value;
      evt.row.cells[evt.index].text = shift.caption;
      evt.setValue(e.value, shift.caption);
    };
  }

  setCellFromDatasource(rowData) {
    const column = this as any;
    if (column.dataField === rowData.employeeId) {
      if (rowData.selectedShiftColumnOfEmployees.indexOf(column.dataField) === -1) {
        rowData.selectedShiftColumnOfEmployees.push(column.dataField);
      }
      return rowData.shiftItem.caption;
    }
  }

  /**
   * Calculates all the summary totals for Total hours, total public holidays, total holidays
   * Each row and colummn that is selected, the employee id is added to the selectedShiftColumnOfEmployees array,
   * the summaries are then calculated for each column selected or changed
   * @param options
   */
  calculateAllTotals(options) {
    let sum = 0;
    // console.log(options);
    // if (options.component._options.summary.totalItems.findIndex(obj => obj.column === options.name) > 0) {
    const totalItemName = options.name.split(':');
    const summaryItems = options.component._options.summary.totalItems;
    const column = summaryItems.find(item => item.name === options.name).column;

    switch (totalItemName[0]) {

      case 'totalhours':
        if (options.summaryProcess === 'start') {
          options.totalValue = 0;
        }

        if (options.summaryProcess === 'calculate') { // currently not working
          console.log('calculate');
          sum = options.component._options.dataSource.reduce((acc, value) => {
            if (value.selectedShiftColumnOfEmployees &&
              value.selectedShiftColumnOfEmployees.findIndex(calcColumn => calcColumn === column) !== -1) {
              acc = acc + value.shiftItem.totalHours;
            }
            return acc;
          }, 0);
        }

        if (options.summaryProcess === 'finalize') {
          sum = options.component._options.dataSource.reduce((acc, value) => {
            if (value.selectedShiftColumnOfEmployees &&
              value.selectedShiftColumnOfEmployees.findIndex(calcColumn => calcColumn === column) !== -1) {
              acc = acc + value.shiftItem.totalHours;
            }
            return acc;
          }, 0);
          options.totalValue = sum;
        }
        break;

      case 'total-public-holidays':

        if (options.summaryProcess === 'start') {
          options.totalValue = 0;
        }

        if (options.summaryProcess === 'finalize') {
          sum = options.component._options.dataSource.reduce((acc, value) => {
            if (value.selectedShiftColumnOfEmployees &&
              value.selectedShiftColumnOfEmployees.findIndex(calcColumn => calcColumn === column) !== -1 &&
              value.shiftItem.type === ShiftType.publicHoliday) {
              acc = acc + value.shiftItem.totalHours;
            }
            return acc;
          }, 0);
          options.totalValue = sum;
        }
        break;

      case 'totalholidays':

        if (options.summaryProcess === 'start') {
          options.totalValue = 0;
        }

        if (options.summaryProcess === 'finalize') {
          sum = options.component._options.dataSource.reduce((acc, value) => {
            if (value.selectedShiftColumnOfEmployees &&
              value.selectedShiftColumnOfEmployees.findIndex(calcColumn => calcColumn === column) !== -1 &&
              value.shiftItem.type === ShiftType.vacation) {
              acc = acc + value.shiftItem.totalHours;
            }
            return acc;
          }, 0);
          options.totalValue = sum;
        }
        break;

      default:
        options.totalValue = 0;
    }
  }


  /**
   * Get the number of days for the month
   * @param {string} month
   * @returns {number}
   */
  getDaysForMonth(month: string): number {
    const index = this.months.indexOf(month);
    return moment({month: index}).daysInMonth();
  }

  /**
   * Get the month index, 0,1,2,3,4... for the month
   * @param {string} month
   * @returns {number}
   */
  getMonthIndex(month: string): number {
    return this.months.indexOf(month);
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

  insert(event: any) {

  }

  update(event: any) {

  }

  /**
   * The toolbar and components in the toolbar above the datagrid
   * @param e
   */
  onToolbarPreparing(e) {
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
        // [routerLink]: '[/employees]'
      },
    });
  }
}
