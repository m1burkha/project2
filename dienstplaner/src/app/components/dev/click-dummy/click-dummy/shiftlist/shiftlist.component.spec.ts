import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftlistComponent } from './shiftlist.component';

describe('ShiftlistComponent', () => {
  let component: ShiftlistComponent;
  let fixture: ComponentFixture<ShiftlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
