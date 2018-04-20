import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ShiftTemplateComponent} from './shift-template.component';
import {HeaderModule} from '@components/header/header.module';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule
} from '@angular/material';
import {ShiftItemsService} from '@services/shift-items/shift-items.service';
import {Observable} from 'rxjs/Observable';
import {IShiftItem} from '@domain-models/shift-scheduling/shift-item';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {environment} from '../../../../environments/environment';

describe('ShiftTemplateComponent', () => {
  let component: ShiftTemplateComponent;
  let fixture: ComponentFixture<ShiftTemplateComponent>;

  const mockTemplateService: any = {
    readAll: jasmine.createSpy('ReadAll')
      .and.returnValue(new Observable<IShiftItem[]>(ob => ob.next(require('../../../../assets/data/mockdata/shift-templates.json'))))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HeaderModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatTooltipModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      declarations: [ShiftTemplateComponent],
      providers: [ShiftItemsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
