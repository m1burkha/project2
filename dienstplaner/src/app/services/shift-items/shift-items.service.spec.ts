import {inject, TestBed} from '@angular/core/testing';

import {ShiftItemsService} from './shift-items.service';
import {environment} from '../../../environments/environment';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

describe('ShiftItemsService', () => {
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
});
