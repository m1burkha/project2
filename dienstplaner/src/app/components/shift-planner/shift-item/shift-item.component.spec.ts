import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftItemComponent } from './shift-item.component';
import {ShiftScheduleService} from "@services/shift-scheduling/shift-scheduling.service";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireModule} from "angularfire2";
import {environment} from "../../../../environments/environment";
import {AngularFirestoreModule} from "angularfire2/firestore";


describe('ShiftItemComponent', () => {
  let component: ShiftItemComponent;
  let fixture: ComponentFixture<ShiftItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      declarations: [ ShiftItemComponent ],
      providers: [ShiftScheduleService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
