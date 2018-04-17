import {Component, OnInit} from '@angular/core';
import {ShiftType} from '@domain-models/shift-scheduling/shift-type.enum';
import {ShiftScheduleService} from '@services/shift-scheduling/shift-scheduling.service';


@Component({
  selector: 'app-shift-item',
  templateUrl: './shift-item.component.html',
  styleUrls: ['./shift-item.component.scss']
})
export class ShiftItemComponent implements OnInit {

  shiftTypes: string[] = [];
  selectedShiftType: ShiftType;


  constructor(private schedulerService: ShiftScheduleService) {
  }

  ngOnInit() {
    this.shiftTypes = Object.keys(ShiftType);
  }

}
