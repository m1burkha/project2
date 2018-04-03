import {Component, OnInit} from '@angular/core';
import {ShiftItemsService} from '@services/shift-items/shift-items.service';
import {ShiftItem} from '@domain-models/shift-scheduling/shift-item';
import {MatDialog} from '@angular/material';
import {AddDialogComponent} from './add-dialog/add-dialog.component';

/**
 * component to modify shift templates
 */
@Component({
  selector: 'app-shift-template',
  templateUrl: './shift-template.component.html',
  styleUrls: ['./shift-template.component.scss']
})
export class ShiftTemplateComponent implements OnInit {
  /** displayed columns */
  displayedColumns: string[] = ['caption', 'type', 'timespans', 'totalhours', 'id'];
  /** elements */
  dataSource: ShiftItem[];

  /**
   * constructor
   * @param {ShiftItemsService} shiftItemsService
   */
  constructor(private shiftItemsService: ShiftItemsService, private dialog: MatDialog) {
  }

  /**
   * on init
   */
  ngOnInit() {
    this.shiftItemsService.readAll().subscribe((items: ShiftItem[]) => {
      this.dataSource = items.sort((a, b) => (a.caption > b.caption ? 1 : -1)).sort((a, b) => (a.type < b.type ? 1 : -1)).map(e => new ShiftItem(e));
    });
  }

  reduceHours(timeSpans): number {
    return timeSpans.reduce((a, b) => a + b.totalHours, 0).toFixed(2);
  }

  editItem(shiftItem: ShiftItem) {
    const dialogReference = this.dialog.open(AddDialogComponent, {
      width: 'auto',
      data: shiftItem
    });

    dialogReference.afterClosed().subscribe(result => {
      if (result && result instanceof ShiftItem) {
        this.shiftItemsService.update(result.id, result);
      }
    });
  }

  /**
   * opens dialog
   */
  addItem() {
    const dialogReference = this.dialog.open(AddDialogComponent, {
      width: 'auto',
    });

    dialogReference.afterClosed().subscribe(result => {
      if (result && result instanceof ShiftItem) {
        this.shiftItemsService.create(result);
      }
    });
  }
}
