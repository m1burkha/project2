import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftTemplateComponent } from './shift-template.component';

describe('ShiftTemplateComponent', () => {
  let component: ShiftTemplateComponent;
  let fixture: ComponentFixture<ShiftTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftTemplateComponent ]
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
