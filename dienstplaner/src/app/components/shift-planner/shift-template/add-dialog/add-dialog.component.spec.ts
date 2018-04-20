import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddDialogComponent} from '@components/shift-planner/shift-template/add-dialog/add-dialog.component';
import {
  MAT_DIALOG_DATA, MatDialogModule,
  MatDialogRef,
  MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatSelectModule,
  MatSnackBarModule
} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

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
        { provide: MAT_DIALOG_DATA, useValue: {}},
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
});
