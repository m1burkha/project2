import {Component, OnInit} from '@angular/core';
import {ShiftType} from '@domain-models/shift-scheduling/shift-type.enum';
import {ShiftScheduleService} from '@services/shift-scheduling/shift-scheduling.service';

@Component({
  selector: 'app-shift-item',
  templateUrl: './shift-item.component.html',
  styleUrls: ['./shift-item.component.scss']
})
export class ShiftItemComponent implements OnInit {

  buttonOptions: any;
  shiftTypes: string[] = [];
  selectedShiftType: ShiftType;


  constructor(private schedulerService: ShiftScheduleService) {
  }

  ngOnInit() {

    this.buttonOptions = {
      text: 'Ok',
      disabled: false,
      visible: true
    };

    this.shiftTypes = Object.keys(ShiftType);
  }

}
