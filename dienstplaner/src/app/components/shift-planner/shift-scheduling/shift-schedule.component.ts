import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DxCalendarComponent, DxDataGridComponent, DxDateBoxComponent, DxPopupComponent} from 'devextreme-angular';
import {IShiftSchedule, ShiftSchedule} from '@domain-models/shift-scheduling/shift-schedule';
import {ShiftScheduleService} from '@services/shift-scheduling/shift-scheduling.service';
import {ShiftItem} from '@domain-models/shift-scheduling/shift-item';
import {ShiftType} from '@domain-models/shift-scheduling/shift-type.enum';


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
  shiftItems: ShiftItem[] = [];
  showpopup: boolean = true;
  buttonOptions: any;
  shiftTypes: string[] = [];
  selectedShiftType: ShiftType;


  constructor(private scheduleService: ShiftScheduleService) {
  }

  ngOnInit() {
    this.employee1 = 'Martin';
    this.employee2 = 'Marc';
    this.shiftList = this.scheduleService.readAll();

    this.shiftItems = [new ShiftItem({totalHours: 3, type: ShiftType.workingShift}), new ShiftItem({
      totalHours: 6,
      type: ShiftType.compensation
    })];

    this.buttonOptions = {
      text: 'Ok',
      disabled: false,
      visible: true
    };

    this.shiftTypes = Object.keys(ShiftType);
    // console.log('keys', Object.keys(ShiftType));
    // console.log('shifttype', ShiftType);
    // for (let b in ShiftType) {
    //   console.log('typeof', typeof ShiftType[b]);
    //   if (typeof ShiftType[b] === 'number') {
    //     this.shiftTypes.push(b);
    //   }
    // }
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

  showShiftItem() {
    this.showpopup = true;

  }

  checkme(event) {
    console.log(event);
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

  // function showDepartamentoPessoas() {
  //   alert('showDepartamentoPessoas');
  // }

//       onCellPrepared: function(e) {
//         if(e.rowType === "data" && e.column.command === "edit") {
//           var isEditing = e.row.isEditing,
//             $links = e.cellElement.find(".dx-link");
//
//           $links.text("");
//
//           if(isEditing){
//             $links.filter(".dx-link-save").addClass("dx-icon-save");
//             $links.filter(".dx-link-cancel").addClass("dx-icon-revert");
//           } else {
//             e.cellElement.prepend('<a class="dx-link dx-icon-group" onclick="showDepartamentoPessoas(1);" href="#"/>');
//             $links.filter(".dx-link-edit").addClass("dx-icon-edit");
//             $links.filter(".dx-link-delete").addClass("dx-icon-trash");
//           }
//         }
//       }
//     });
//   });
//
//   $("#container").dxDataGrid({
//                                dataSource: generateData(5),
//   columns: ['firstName', 'lastName', 'sex',
//     {
//       width: 100,
//       alignment: 'center',
//       cellTemplate: function (container, options) {
//       $('<a/>').addClass('dx-link')
//       .text('details')
//       .on('dxclick', function () {
//       $("#popup").dxPopup("instance").show();
//       $("#txt").dxTextArea("instance").option("value", options.data.firstName);
//     }).appendTo(container);
// }
// }]
// });
//
// $("#popup").dxPopup({
//   showTitle: true,
//   title: 'Popup title',
//   contentTemplate: function() {
//     return $("<div />").append(
//       $("<div id='txt' />")
//         .dxTextArea({
//           value: "some text"
//         })
//     );
//   }
// });


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
