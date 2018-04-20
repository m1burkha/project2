import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RegisterDialogComponent} from './register-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';
import {UserService} from '@services/user/user.service';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../../../environments/environment';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('RegisterDialogComponent', () => {
  let component: RegisterDialogComponent;
  let fixture: ComponentFixture<RegisterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule
      ],
      declarations: [RegisterDialogComponent],
      providers: [
        UserService,
        {provide: MatDialogRef, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create RegisterDialogComponent', () => {
    expect(component).toBeTruthy();
  });

  it('is registration invalid when empty ', () => {
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

  it('submit register form valid ,  submit register form invalid', () => {
    const button = component.form.controls['button'];
    component.form.controls['username'].setValue('test');
    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['password'].setValue('123456');
    fixture.detectChanges();
    expect(component.form.invalid).toBeFalsy();
    component.form.controls['username'].setValue('');
    component.form.controls['email'].setValue('');
    component.form.controls['password'].setValue('');
    fixture.detectChanges();
    expect(component.form.invalid).toBeTruthy();
  });
});
