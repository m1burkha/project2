import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DxDataGridComponent, DxDateBoxComponent} from 'devextreme-angular';
import {IShiftSchedule, ShiftSchedule} from '@domain-models/shift-scheduling/shift-schedule';
import {ShiftScheduleService} from '@services/shift-scheduling/shift-scheduling.service';
import {ShiftItem} from '@domain-models/shift-scheduling/shift-item';
import {ShiftType} from '@domain-models/shift-scheduling/shift-type.enum';
import moment = require('moment');
import {MonthSelector} from '@domain-models/shift-scheduling/month-selector';
import {Employee, IEmployee} from '@domain-models/employee/employee';
import {EmployeeService} from '@services/employee/employee.service';


@Component({
  selector: 'app-shift-scheduling',
  templateUrl: './shift-schedule.component.html',
  styleUrls: ['./shift-schedule.component.scss']
})
export class ShiftScheduleComponent implements OnInit {

  shiftList: Observable<IShiftSchedule[]>;
  totalCount: number;
  selectionChangedBySelectbox: boolean;
  employee1: string;
  employee2: string;
  shiftItems: ShiftItem[] = [];
  showShiftItemPopup: Boolean = true;
  months: string[];
  month: string;
  daysOfMonth: number;
  employees: Observable<IEmployee[]>;


  @Output() monthSelector = new EventEmitter<MonthSelector>();
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;


  constructor(private scheduleService: ShiftScheduleService, private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employee1 = 'Martin';
    this.employee2 = 'Marc';
    this.employees = this.employeeService.readAll();
    this.shiftList = this.scheduleService.readAll();
    this.months = this.scheduleService.getMonths();
    this.month = this.scheduleService.getCurrentMonth();
  }

  filterSelected(event) {
    this.month = event.value;
    this.daysOfMonth = this.scheduleService.getDaysForMonth(event.value);
  }

  onUpdateSchedule(event: any): void {
    console.log('update', event);
    this.scheduleService.update(event.key, event.newData);
  }

  onDeleteSchedule(event: any): void {
    console.log('delete', event);
    this.scheduleService.delete(event.key);
  }

  showShiftItem() {
    this.showShiftItemPopup = true;
  }


  onToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      template: 'totalGroupCount'
    }, {
      location: 'after',
      widget: 'dxButton',
      options: {
        icon: 'refresh',
        // onClick: this.refreshDataGrid.bind(this)
      }
    });
  }
}