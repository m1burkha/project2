import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatSnackBar} from "@angular/material";
import {UserService} from "@services/user/user.service";
import * as firebase from "firebase/app";
import {RegisterDialogComponent} from "@components/register-dialog/register-dialog.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit{
  username: FormControl = new FormControl('', [Validators.required]);
  password: FormControl = new FormControl('', [Validators.required]);
  form: FormGroup;
  hide = true;

  getUsernameErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value' :
      this.username.hasError('username') ? 'Not a valid username' :
        '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('password') ? 'Not a valid password' :
        '';
  }
 /**
   * Login coconstructor injecting the FormBuilder for forms and UserService for login
   */
  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.form = formBuilder.group({
      username: this.username,
      password: this.password
    });
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) this.router.navigate(['/shiftlist']);
    });
  }

  /** User login authentication */
  login() {
    if (this.username.valid && this.password.valid)
      this.userService.login(this.username.value, this.password.value).then(e => {
        // this.snackBar.open(e, null, { duration: 3000 });
        console.log('custom then', e);
        if (typeof Storage !== undefined) {
          sessionStorage.setItem('auth_token', JSON.stringify(e));
        }
        this.router.navigate(['/shiftlist']);
      }).catch(e => {
        this.snackBar.open(e.message, null, {duration: 3000, verticalPosition: 'top', panelClass: ['mat-snack-bar-container__error']});
      });
  }
  /**
   * opens register dialog
   */
  register() {
    let dialogRef = this.dialog.open(RegisterDialogComponent);
  }
}
