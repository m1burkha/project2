import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material";
import {UserService} from "@services/user/user.service";

@Component({
  template: ''
})
export class LogoutComponent implements OnInit{
  /**
   * logout constructor
   */
  constructor(private userService: UserService, private router: Router) {
  }

  /** on init */
  ngOnInit() {
      this.userService.logout().then(() => {
        this.router.navigate(['/']);
      });
  }
}
