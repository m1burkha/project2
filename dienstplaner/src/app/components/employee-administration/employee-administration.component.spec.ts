import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAdministrationComponent } from './employee-administration.component';
import {HeaderComponent} from '@components/header/header.component';

describe('EmployeeAdministrationComponent', () => {
  let component: EmployeeAdministrationComponent;
  let fixture: ComponentFixture<EmployeeAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAdministrationComponent, HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
