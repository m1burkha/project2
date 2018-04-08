import {Component, OnInit} from '@angular/core';
import {ShiftScheduleService} from '@services/shift-scheduling/shift-scheduling.service';
import {ShiftSchedule} from '@domain-models/shift-scheduling/shift-schedule';
import * as Moment from 'moment';
import {ShiftItem} from '@domain-models/shift-scheduling/shift-item';
import {ShiftType} from '@domain-models/shift-scheduling/shift-type.enum';
import {EmployeeShiftItem} from '@domain-models/shift-scheduling/employee-shift-item';

@Component({
  selector: 'app-server-comm',
  templateUrl: './server-comm.component.html',
  styleUrls: ['./server-comm.component.scss']
})
export class ServerCommComponent {

  constructor(private scheduleService: ShiftScheduleService) {
  }

  saveEntry() {
    const shift = new ShiftSchedule({
      id: Moment().format('YYYY-MM-DD'), date: new Date(), selectedShiftColumnOfEmployees: [
        new EmployeeShiftItem({
          employeeId: '5MY69SV5cFEorxeGqtEa',
          shiftItem: new ShiftItem({
            id: '',
            caption: 'Urlaub',
            timeSpans: [],
            type: ShiftType.vacation
          })
        }),
        new EmployeeShiftItem({
          employeeId: '9kTDXHvzJoPHnBT6H0R7',
          shiftItem: new ShiftItem({
            id: '',
            caption: 'Frühschicht',
            timeSpans: [],
            type: ShiftType.workingShift
          })
        }),
        new EmployeeShiftItem({
          employeeId: '1FU8y4kVr6AQ8yP6vRX4',
          shiftItem: new ShiftItem({
            id: '',
            caption: 'Feiertag',
            timeSpans: [],
            type: ShiftType.publicHoliday
          })
        }),
      ]
    });

    const date = Moment().add(1, 'days');
    const secondshift = new ShiftSchedule({
      id: date.format('YYYY-MM-DD'), date: date.toDate(), selectedShiftColumnOfEmployees: [
        new EmployeeShiftItem({
          employeeId: '5MY69SV5cFEorxeGqtEa',
          shiftItem: new ShiftItem({
            id: '',
            caption: 'Spätschicht',
            timeSpans: [],
            type: ShiftType.workingShift
          })
        }),
      ]
    });

    this.scheduleService.createShift(shift);
    this.scheduleService.createShift(secondshift);
  }

}
