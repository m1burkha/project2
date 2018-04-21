import {inject, TestBed} from '@angular/core/testing';

import {ShiftItemsService} from './shift-items.service';
import {environment} from '../../../environments/environment';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {IShiftItem} from '@domain-models/shift-scheduling/shift-item';
import {ShiftType} from '@domain-models/shift-scheduling/shift-type.enum';

describe('ShiftItemsService', () => {

  const mockSchedules = new Observable<IShiftItem[]>(sub => sub.next(require('../../../assets/data/mockdata/shift-templates.json')));
  const serviceMock: any = {
    readAllShifts: jasmine.createSpy('subscribe')
      .and.returnValue(mockSchedules),
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
      ],
      providers: [ShiftItemsService, AngularFirestore]
    });
  });

  it('should be created', inject([ShiftItemsService], (service: ShiftItemsService) => {
    expect(service).toBeTruthy();
  }));

  it('service should return an Observable<IShiftItem[]> array',
    inject([ShiftItemsService], (service: ShiftItemsService) => {

      service.readAll().subscribe(items => {
        expect(items.length).toBe(7);
        expect(items[0].caption).toEqual('"10:00 - 19:00"');
        expect(items[1].type).toEqual(ShiftType.workingShift);
      });
    }));

});
