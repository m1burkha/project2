import {Component, OnInit} from '@angular/core';
import {ShiftType} from '@domain-models/shift-scheduling/shift-type.enum';
import {ShiftScheduleService} from '@services/shift-scheduling/shift-scheduling.service';

/** ShiftItemComponent component */
@Component({
  selector: 'app-shift-item',
  templateUrl: './shift-item.component.html',
  styleUrls: ['./shift-item.component.scss']
})
/** ShiftItemComponent class */
export class ShiftItemComponent implements OnInit {

  /** shift type array */
  shiftTypes: string[] = [];
  /** selected shift type {ShiftType} */
  selectedShiftType: ShiftType;

  /**
   * constructor
   * @param {ShiftScheduleService} schedulerService
   */
  constructor(private schedulerService: ShiftScheduleService) {
  }

  /** on init */
  ngOnInit() {
    this.shiftTypes = Object.keys(ShiftType);
  }

}
