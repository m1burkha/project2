import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {AuthenticationService} from "../../services/authentication/authentication.service";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitLogin: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      declarations: [ LoginComponent ],
      providers: [AuthenticationService, HttpClient]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    submitLogin = fixture.debugElement.query(By.css('button'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('is login invalid when empty ',  () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('username field invalid when empty', () => {
    let username = component.loginForm.controls['username'];
    expect(username.valid).toBeFalsy();
  });

  it('password field invalid when empty', () => {
    let password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();
    //expect()
  });

  it('submit login button valid when fields valid,  disabled when fields invalid', () => {
    let button = component.loginForm.controls['button'];
    component.loginForm.controls['username'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('123456');
    fixture.detectChanges();
    expect(submitLogin.nativeElement.disabled).toBeFalsy();
    component.loginForm.controls['username'].setValue('');
    component.loginForm.controls['username'].setValue('');
    fixture.detectChanges();
    expect(submitLogin.nativeElement.disabled).toBeTruthy();
  });

  it('test login', () => {

  });
});