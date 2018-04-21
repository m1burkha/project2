import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AddDialogComponent} from '@components/shift-planner/shift-template/add-dialog/add-dialog.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from "@angular/platform-browser";

describe('AddPopupComponent', () => {
  let component: AddDialogComponent;
  let fixture: ComponentFixture<AddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatSelectModule,
        MatSnackBarModule,
        MatIconModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule
      ],
      declarations: [AddDialogComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validate input control Bezeichnung', () => {
    const inputfield = fixture.debugElement.query(By.css('input')).nativeElement;
    inputfield.value = '';
    expect(inputfield.validity.valid).toBeFalsy();
    fixture.detectChanges();
    inputfield.value = '1234';
    expect(inputfield.validity.valid).toBeTruthy();
  });

  it('detect value change on select', () => {
    const select = fixture.debugElement.query(By.css('mat-select'));
    const options = select.componentInstance.options.toArray();
    const selectComponent = select.componentInstance;
    select.nativeElement.click();
    fixture.detectChanges();
    expect(selectComponent.panelOpen).toBe(true);
    // const option2 = fixture.debugElement.query(By.css('md-option-2'));
    // option2.nativeElement.getAttribute('aria-selected').value = true;

  });


});
