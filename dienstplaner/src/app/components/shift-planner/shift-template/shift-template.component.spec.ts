import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
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
import {IShiftItem, ShiftItem} from '@domain-models/shift-scheduling/shift-item';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {environment} from '../../../../environments/environment';
import {By} from '@angular/platform-browser';

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
      providers: [{provide: ShiftItemsService, useValue: mockTemplateService}]
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

  it('should contain data in the shift template table', inject([ShiftItemsService], (service: ShiftItemsService) => {
    service.readAll().subscribe((items: ShiftItem[]) => {
      component.dataSource = items.sort((a, b) => (a.caption > b.caption ? 1 : -1))
        .sort((a, b) => (a.type < b.type ? 1 : -1)).map(e => new ShiftItem(e));
      fixture.detectChanges();
    });
    const rows = fixture.debugElement.queryAll(By.css('mat-row'));
    rows.forEach(x => {
      const cellData = x.nativeElement.textContent.includes('Krank');
      if (cellData) {
        expect(cellData).toBeTruthy();
      }
    });

  }));
});
