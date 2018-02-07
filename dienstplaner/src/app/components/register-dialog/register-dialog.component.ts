import {Component, Inject} from '@angular/core';
import {MatDialogRef, MatSnackBar} from "@angular/material";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "@services/user/user.service";

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent {
  username: FormControl = new FormControl('', [Validators.required]);
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', [Validators.required]);
  form: FormGroup;
  hide = true;

  getUsernameErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value' :
      this.username.hasError('username') ? 'Not a valid username' :
        '';
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value' :
      this.password.hasError('password') ? 'Not a valid password' :
        '';
  }

  constructor(public dialogRef: MatDialogRef<RegisterDialogComponent>, private userService: UserService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    this.form = formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password
    });
  }

  /** register user */
  register() {
    if (this.username.valid && this.email.valid && this.password.valid)
      this.userService.create(this.username.value, this.email.value, this.password.value).then(e => {
        this.snackBar.open('user created', null, {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['mat-snack-bar-container__success']
        });
        console.log('custom then', e);
        if (typeof Storage !== undefined) {
          sessionStorage.setItem('auth_token', JSON.stringify(e));
        }
        this.dialogRef.close();
      }).catch(e => {
        this.snackBar.open(e.message, null, {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['mat-snack-bar-container__error']
        });
      });
  }

  onClick(): void {
    this.dialogRef.close();
  }

}
