import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevBarComponent } from './dev-bar.component';

describe('DevBarComponent', () => {
  let component: DevBarComponent;
  let fixture: ComponentFixture<DevBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
