import {AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
  }
];
const shedules: ShiftSchedule[] = [
  {
    id: 'a',
    shiftDate: moment({month: 2, day: 12, year: 2018}).toDate(),
    // employeeId: '1FU8y4kVr6AQ8yP6vRX4',
    selectedShiftColumnOfEmployees: [{
      columnId: '1FU8y4kVr6AQ8yP6vRX4',
      columnCaption: 'Harry Hasler',
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
    shiftDate: moment(moment(), 'L').day(10).toDate(),
    // employeeId: '5MY69SV5cFEorxeGqtEa',
    selectedShiftColumnOfEmployees: [{
      columnId: '5MY69SV5cFEorxeGqtEa',
      columnCaption: 'Marco Polo',
      shiftItem: {
        id: '10', caption: 'WorkingShift', type: ShiftType.workingShift, timeSpans: [
          {id: '3', startTime: '09:00', endTime: '12:30', totalHours: 3, month: 2},
          {id: '4', startTime: '13:30', endTime: '18:30', totalHours: 2.5, month: 2},
        ], totalHours: 5.5
      }
    }],
  },
  {
    id: 'c', shiftDate: moment({month: 2, day: 14, year: 2018}).toDate(),
    // employeeId: '9kTDXHvzJoPHnBT6H0R7',
    selectedShiftColumnOfEmployees: [{
      columnId: '9kTDXHvzJoPHnBT6H0R7',
      columnCaption: 'Kollege Essig',
      shiftItem: {
        id: '10', caption: 'vacation', type: ShiftType.vacation, timeSpans: [
          {id: '5', startTime: '08:00', endTime: '12:00', totalHours: 2, month: 2},
          {id: '6', startTime: '13:00', endTime: '17:00', totalHours: 2.5, month: 2},
        ], totalHours: 4.5
      }
    }]
  },
  {
    id: 'd', shiftDate: moment({month: 6, day: 19, year: 2018}).toDate(),
    // employeeId: '5MY69SV5cFEorxeGqtEa',
    selectedShiftColumnOfEmployees: [{
      columnId: '5MY69SV5cFEorxeGqtEa',
      columnCaption: 'Markus Peterer',
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
  totalCount: number;
  shiftItems: ShiftItem[];
  months: string[];
  monthName: string;
  employees: Employee[] = [];
  shiftTemplates: ShiftItem[];
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
              private shiftTemplateService: ShiftItemsService,
              private router: Router) {
  }

  /** Initialise the shift schedule component variables / instances */
  ngOnInit() {
    this.months = moment.months();
    const complete = zip(
      this.shiftTemplateService.readAll(),
      this.employeeService.readAll())
      .map(([templates, employees]: [ShiftItem[], Employee[]]) => {
        this.shiftTemplates = myTemplates;
        this.employees = employees;
        this.totalEmployees = this.employees.length;
      })
      .subscribe(x => {
        this.createDefaultShifts(moment().month());
        this.populateDatagridWithData(moment().month());
      });
  }

  /**
   * Filters the shifts that the user has selected
   * @param event , the selected month
   */
  filterMonthSelection(event): void {
    // this.daysOfMonth = this.getDaysForMonth(event.value);
    const selectedMonth = this.months.findIndex(month => month === event.value);
    this.createDefaultShifts(selectedMonth);
  }

  /**
   * Filters the current or selected month to display. If no shift list is avaiable a new
   * shift schedule is create for that month
   * @param month
   * @returns {Observable<IShiftSchedule[]>}
   */
  createDefaultShifts(monthIndex: number): void {
    const shifts: ShiftSchedule[] = [];
    // populate the datagrid with default values
    for (let i = 1; i < moment().month(monthIndex).daysInMonth() + 1; i++) {
      const scheduleRow = new ShiftSchedule();
      scheduleRow.id = `${monthIndex}.${moment().year()}`;
      scheduleRow.shiftDate = moment({day: i, month: monthIndex, year: moment().year()}).toDate();
      scheduleRow.selectedShiftColumnOfEmployees = [];
      this.employees.map(employee => {
        const row = {
          columnCaption: employee.caption,
          columnId: employee.id,
          shiftItem: new ShiftItem({id: 0, caption: 'Select Shifts', type: ShiftType.workingShift}) // default shiftItem value
        };
        scheduleRow.selectedShiftColumnOfEmployees.push(row);
      });
      shifts.push(scheduleRow);
    }
    this.sheduleDataSource = shifts;
  }

  populateDatagridWithData(monthIndex): void {

    shedules.map(shedule => {
      const currentRow = this.sheduleDataSource.find(row => {
        return row.shiftDate.getDay() === shedule.shiftDate.getDay();
      });
      const index = currentRow && currentRow.selectedShiftColumnOfEmployees.findIndex(
        columnIndex => columnIndex.columnId === shedule.selectedShiftColumnOfEmployees[0].columnId);
      if (index !== -1) {
        currentRow.selectedShiftColumnOfEmployees[index].shiftItem = shedule.selectedShiftColumnOfEmployees[0].shiftItem;
      }
    });
    // uncomment to use
    // this.scheduleService.readAll().subscribe((monthlylist: ShiftSchedule[]) => {
    //   monthlylist.filter(shedule => shedule.shiftDate.getMonth() === monthIndex)
    //     .map(monthShedule => {
    //       const currentRow = this.sheduleDataSource.find(row => {
    //         return row.shiftDate.getDay() === monthShedule.shiftDate.getDay();
    //       });
    //       const index = currentRow && currentRow.selectedShiftColumnOfEmployees.findIndex(
    //         columnIndex => columnIndex.columnId === monthShedule.selectedShiftColumnOfEmployees[0].columnId);
    //       if (index !== -1) {
    //         currentRow.selectedShiftColumnOfEmployees[index].shiftItem = monthShedule.selectedShiftColumnOfEmployees[0].shiftItem;
    //       }
    //     });
    // });
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
      const shiftValue = evt.row.data.selectedShiftColumnOfEmployees.find(shift => shift.columnId === evt.dataField);
      const shiftTemplate = this.shiftTemplates.find(template => template.id === e.value);
      if (shiftValue) {
        shiftValue.shiftItem = shiftTemplate;
      }
      evt.setValue(e.value);
      this.dataGrid.instance.refresh();
    };
  }

  setCellFromDatasource(rowData) {
    const column = this as any;

    if (column.dataField === rowData.employeeId) {
      if (rowData.selectedShiftColumnOfEmployees.indexOf(column.dataField) === -1) {
        rowData.selectedShiftColumnOfEmployees.push({empId: column.dataField, shift: rowData.shiftItem});
      }
      // column.setCellValue(rowData, rowData.shiftItem.caption);
      column.setCellValue(rowData);
      return rowData.shiftItem.caption;
    } else {
      // return null;
      // const cell1 = column.lookup.dataSource.find(cell => cell.caption === rowData.shiftItem.caption).caption;

      // return cell;
      // return rowData.shiftItem.caption;
      // const cell = rowData.selectedShiftColumnOfEmployees.find(col => col === column.dataField);
      // return cell !== undefined ? rowData.shiftItem.caption : '';
    }
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
            const columnValue = row.selectedShiftColumnOfEmployees.find(cell => cell.columnId === column);
            if (columnValue) {
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
            const columnValue = row.selectedShiftColumnOfEmployees.find(cell => cell.columnId === column);
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
            const columnValue = row.selectedShiftColumnOfEmployees.find(cell => cell.columnId === column);
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

// if (options.summaryProcess === 'calculate' && column === totalItemName[1]) {
//   console.log('calculate');
// }


//  return this.scheduleService.readAll().reduce((acc, item) => {
// const tmp = schedules.reduce((row, shiftItem) => {
//   if (shiftItem.shiftDate.getMonth() === month) {
//     row.push(shiftItem);
//   }
//   return row;
// }, [])
//   .switchMap(monthlyShiftList => {
// if (monthlyShift.length >= 0 && monthlyShift.length <= 31) {
//   return Observable.of(monthlyShift);
// }

// evt.row.cells[evt.index].value = e.value;
// evt.row.cells[evt.index].displayValue = shift.caption;
// evt.row.cells[evt.index].text = shift.caption;
// evt.row.cells[evt.index].values[evt.index] = shift.caption;
// evt.editorOptions.value = shift.caption;

// const shift = this.shiftTemplates.find(template => {
//   return template.id === e.value;
// });
// const selectedEmp = evt.row.data.selectedShiftColumnOfEmployees.find(emp => emp === evt.dataField);
// if (!selectedEmp) {
//   evt.row.data.selectedShiftColumnOfEmployees.push({empId: evt.dataField, shift: shift});
// }
// evt.row.data.employeeId = evt.dataField;
// evt.row.data.shiftItem = shift;

