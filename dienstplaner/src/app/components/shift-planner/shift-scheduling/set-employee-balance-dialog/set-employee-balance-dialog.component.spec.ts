import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetEmployeeBalanceDialogComponent } from './set-employee-balance-dialog.component';

describe('SetEmployeeBalanceDialogComponent', () => {
  let component: SetEmployeeBalanceDialogComponent;
  let fixture: ComponentFixture<SetEmployeeBalanceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetEmployeeBalanceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetEmployeeBalanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
