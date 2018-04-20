import {async, inject, TestBed} from '@angular/core/testing';
import {ShiftScheduleService} from './shift-scheduling.service';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../../environments/environment';
import {HttpTestingController} from '@angular/common/http/testing';
import {Observable} from 'rxjs/Observable';
import {IShiftSchedule} from '@domain-models/shift-scheduling/shift-schedule';

describe('ShiftScheduleService', () => {

  const mockSchedules = new Observable<IShiftSchedule[]>(sub => sub.next(require('../../../assets/data/mockdata/shiftSchedules.json')));
  const serviceMock: any = {
    readAllShifts: jasmine.createSpy('subscribe')
      .and.returnValue(mockSchedules),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // AngularFireModule.initializeApp(environment.firebase),
        // AngularFireDatabaseModule
      ],
      providers: [HttpTestingController,
        {provide: ShiftScheduleService, useValue: serviceMock}
      ]
    });
  }));

  it('ShiftScheduleService should be created', inject([ShiftScheduleService], (service: ShiftScheduleService) => {
    expect(service).toBeTruthy();
  }));

  it('service should return an Observable<ShiftSchedule[]> array',
    inject([ShiftScheduleService], (service: ShiftScheduleService) => {

      service.readAllShifts(new Date()).subscribe(shifts => {
        expect(shifts.length).toBe(2);
        expect(shifts[0].date.toString()).toEqual('2018-03-31T23:00:00.000Z');
        expect(shifts[1].date.toString()).toEqual('2018-04-02T23:00:00.000Z');
      });
    }));
});




