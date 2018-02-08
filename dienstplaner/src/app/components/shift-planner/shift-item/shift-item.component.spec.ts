import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftItemComponent } from './shift-item.component';

describe('ShiftItemComponent', () => {
  let component: ShiftItemComponent;
  let fixture: ComponentFixture<ShiftItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftItemComponent ]
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
