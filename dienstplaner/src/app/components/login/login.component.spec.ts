import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {UserService} from "@services/user/user.service";
import {
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule
} from "@angular/material";
import {AngularFireAuthModule} from "angularfire2/auth";
import {environment} from "../../../environments/environment";
import {AngularFireModule} from "angularfire2";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitLogin: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatIconModule,
        MatCardModule,
        MatSnackBarModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule],
      declarations: [LoginComponent],
      providers: [UserService, HttpClient]
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

  it('is login invalid when empty ', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('username field invalid when empty', () => {
    const username = component.form.controls['username'];
    expect(username.valid).toBeFalsy();
  });

  it('password field invalid when empty', () => {
    const password = component.form.controls['password'];
    expect(password.valid).toBeFalsy();

  });

  it('submit login form valid ,  submit login form invalid', () => {
    const button = component.form.controls['button'];
    component.form.controls['username'].setValue('test@test.com');
    component.form.controls['password'].setValue('123456');
    fixture.detectChanges();
    expect(component.form.invalid).toBeFalsy();
    component.form.controls['username'].setValue('');
    component.form.controls['password'].setValue('');
    fixture.detectChanges();
    expect(component.form.invalid).toBeTruthy();
  });

});
