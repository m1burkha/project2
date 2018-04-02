import {async, inject, TestBed, tick} from '@angular/core/testing';
import {ShiftScheduleService} from './shift-scheduling.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {AngularFirestore, AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../../environments/environment';

describe('ShiftScheduleService', () => {
   // let scheduleService: ShiftScheduleService;
   // let httpMockController: HttpTestingController;
   const mockSchedules = require('../../../assets/mockdata/shiftSchedules.json');

  beforeEach(async(() => {

    // spyOn(angularFireDatabaseStub, 'shiftSchedules').and.returnValue(mockSchedules);
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule],
      providers: [ShiftScheduleService, HttpTestingController]
    })
      .compileComponents();

     // scheduleService = TestBed.get(ShiftScheduleService);
     // httpMockController = TestBed.get(HttpTestingController);

  }));

   afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should return an Observable<ShiftSchedule[]> array',
    inject([HttpTestingController, ShiftScheduleService], (httpMock: HttpTestingController, service: ShiftScheduleService) => {

    service.readAllShifts('2018', '2').subscribe(items => {
      console.log('items', items);
      expect(items.length).toBe(5);
      // expect(items[0]['2.2018'].shiftSchedules[0].date).toEqual('2018-03-09T23:00:00.000Z');
      // expect(items[1]['3.2018'].shiftSchedules[0].date).toEqual('2018-04-07T22:00:00.000Z');
      // expect(items[3]['4.2018'].shiftSchedules[0].date).toEqual('2018-05-03T22:00:00.000Z');
      tick();
    });
    const req = httpMock.expectOne('shiftScheduling', 'call to schedulelist');
    expect(req.request.method).toEqual('GET');
    req.flush(mockSchedules);
    // httpMock.verify();
  }));
});



