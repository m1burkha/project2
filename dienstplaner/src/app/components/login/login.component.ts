import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {UserService} from '@services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errormessage: string;
  loginsuccess: boolean;
  email: AbstractControl;
  password: AbstractControl;

  /**
   * Login coconstructor injecting the FormBuilder for forms and AuthenticationService for login
   * @param {FormBuilder} fb
   * @param {AuthenticationService} authenticatioService
   */
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }

  /** Initialise the form controls and clear any sessions */
  ngOnInit() {
    this.userService.logout();
    this.initControls();
  }

  /** Init the form filed controls */
  initControls() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }

  /** User login authentication */
  onlogin() {

    const formValues = this.loginForm.value;
    if (this.loginForm.valid) {

      // TODO remove once user created....
      this.loginsuccess = true;
      this.router.navigate(['/shiftlist']);
      // const pp = this.userService.create('Martin', formValues.email, formValues.password);

      // .........

      // this.userService.login(formValues.email, formValues.password)
      //   .then(user => {
      //     console.log(user);
      //     if (user) {
      //        sessionStorage.setItem('auth_token', JSON.stringify({token: user.tokenid}));
      //        sessionStorage.setItem('token_expires_at', JSON.stringify({expire_date: user.exp}));
      //     this.loginsuccess = true;
      //     this.router.navigate(['/shiftlist']);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //     this.loginsuccess = false;
      //     this.errormessage = error.message;
      //   });
    }
  }

  /**
   * method that can set the validity of the controls & fields in the form (disable / visible / hidden)
   * @param {string} field
   * @returns {boolean}
   */
  isFieldValid(field: string): boolean {
    return !this.loginForm.controls[field].valid && this.loginForm.controls[field].touched;
  }

}
