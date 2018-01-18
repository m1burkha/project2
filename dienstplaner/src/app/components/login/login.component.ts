import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errormessage: string;
  loginsuccess: boolean;
  username: AbstractControl;
  password: AbstractControl;

  /**
   * Login coconstructor injecting the FormBuilder for forms and AuthenticationService for login
   * @param {FormBuilder} fb
   * @param {AuthenticationService} authenticatioService
   */
  constructor(private fb: FormBuilder, private authenticatioService: AuthenticationService, private router: Router) {
  }

  /** Initialise the form controls and clear any sessions */
  ngOnInit() {
    this.authenticatioService.logout();
    this.initControls();
  }

  /** Init the form filed controls */
  initControls() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
  }

  /** User login authentication */
  onlogin() {

    const formValues = this.loginForm.value;
    if (this.loginForm.valid) {
      this.authenticatioService.login(formValues.username, formValues.password)
        .subscribe(res => {
            if (res === false) {
              this.loginsuccess = false;
              this.errormessage = 'Keine verbindug zu Server.........';
            } else {
              this.loginsuccess = true;
              this.router.navigate(['/shiftlist']);
            }
          },
          error => this.errormessage = error
        );
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
