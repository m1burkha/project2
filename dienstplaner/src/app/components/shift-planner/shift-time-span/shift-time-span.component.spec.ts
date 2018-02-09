import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftTimeSpanComponent } from './shift-time-span.component';

describe('ShiftTimeSpanComponent', () => {
  let component: ShiftTimeSpanComponent;
  let fixture: ComponentFixture<ShiftTimeSpanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftTimeSpanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftTimeSpanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
