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
  displayedColumns: string[] = ['caption', 'timespans', 'totalhours'];
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
      this.dataSource = items;
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
