import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickDummyComponent } from './click-dummy.component';

describe('ClickDummyComponent', () => {
  let component: ClickDummyComponent;
  let fixture: ComponentFixture<ClickDummyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickDummyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickDummyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
