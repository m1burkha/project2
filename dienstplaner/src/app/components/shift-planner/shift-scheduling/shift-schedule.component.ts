import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DxCalendarComponent, DxDataGridComponent, DxDateBoxComponent} from 'devextreme-angular';
import {IShiftSchedule, ShiftSchedule} from '@domain-models/shift-scheduling/shift-schedule';
import {ShiftScheduleService} from '@services/shift-scheduling/shift-scheduling.service';


@Component({
  selector: 'app-shift-scheduling',
  templateUrl: './shift-schedule.component.html',
  styleUrls: ['./shift-schedule.component.scss']
})
export class ShiftScheduleComponent implements OnInit {

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  @ViewChild(DxDateBoxComponent) calendar: DxDateBoxComponent;

  shiftList: Observable<IShiftSchedule[]>;
  totalCount: number;
  selectionChangedBySelectbox: boolean;
  employee1: string;
  employee2: string;


  constructor(private scheduleService: ShiftScheduleService) {
  }

  ngOnInit() {
    this.employee1 = 'Martin';
    this.employee2 = 'Marc';
    this.shiftList = this.scheduleService.readAll();


  }

  selectionChangedHandler() {
    this.selectionChangedBySelectbox = !this.selectionChangedBySelectbox;
  }


  onAddSchedule(event: any): void {
    console.log('event', event);
    this.scheduleService.create(new ShiftSchedule(event.data));

  }

  onUpdateSchedule(event: any): void {
    console.log('update', event);
    this.scheduleService.update(event.key, event.newData);
  }

  onDeleteSchedule(event: any): void {
    console.log('delete', event);
    this.scheduleService.delete(event.key);
  }

  onRowEdit(event) {
    console.log('onrow edit ', event);
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

//
// groupChanged(e) {
//   this.dataGrid.instance.clearGrouping();
//   this.dataGrid.instance.columnOption(e.value, 'groupIndex', 0);
//   this.totalCount = this.getGroupCount(e.value);
// }
//
// collapseAllClick(e) {
//   this.expanded = !this.expanded;
//   e.component.option({
//     icon: this.expanded ? 'chevrondown' : 'chevronnext',
//     hint: this.expanded ? 'Collapse All' : 'Expand All'
//   });
// }
//
// refreshDataGrid() {
//   this.dataGrid.instance.refresh();
// }

}
