import {Component, OnInit, ViewChild} from '@angular/core';
import {ShiftList} from '../../../domain-models/shift-list/shift-list';
import {ShiftService} from '../../../services/shifts/shift.service';
import {Observable} from 'rxjs/Observable';
import {DxDataGridComponent} from 'devextreme-angular';


const list: ShiftList[] = [
  {
    'name': 'Martin',
    'date': Date.now(), // '12.05.217',
    'branch': 'EED',
    'shiftTime': new Date().getTime(),
    'shiftGroup': 'B2B',
    'hours': 12175,
    'status': 'California'
  },
  {
    'name': 'Martin',
    'date': '12.10.2016',
    'branch': 'EED',
    'shiftTime': new Date().getTime(),
    'shiftGroup': 'AZB',
    'hours': 12,
    'status': 'California'
  },
  {
    'name': 'Marc',
    'date': '04.05.2016',
    'branch': 'AAW',
    'shiftTime': new Date().getTime(),
    'shiftGroup': 'AZB',
    'hours': 165,
    'status': 'California'
  },
  {
    'name': 'Marc',
    'date': '13.02.2017',
    'branch': 'AAW',
    'shiftTime': new Date().getTime(),
    'shiftGroup': 'MMM',
    'hours': 50,
    'status': 'California'
  }];

export class Order {
  OrderNumber: number;
  SaleAmount: number;
  StoreCity: string;
  StoreState: string;
  Employee: string;
  OrderDate: string;
}

@Component({
  selector: 'app-shift-scheduling',
  templateUrl: './shift-scheduling.component.html',
  styleUrls: ['./shift-scheduling.component.scss']
})
export class ShiftSchedulingComponent implements OnInit {

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  shiftList: ShiftList[];
  shiftList2: Observable<any>;
  totalCount: number;
  selectionChangedBySelectbox: boolean;


  constructor(private shiftService: ShiftService) {
  }

  ngOnInit() {
    // this.shiftService.getShiftlist()
    //   .subscribe(x => {
    //     console.log(x);
    //     this.shiftList = x;
    //   });

    this.shiftList = list;
    console.log(this.shiftList);
    this.totalCount = 2;
  }

  selectionChangedHandler() {
    this.selectionChangedBySelectbox = !this.selectionChangedBySelectbox;


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
