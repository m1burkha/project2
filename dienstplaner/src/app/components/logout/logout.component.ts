import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '@services/user/user.service';

/** The logout component */
@Component({
  template: ''
})
/** The logout class*/
export class LogoutComponent implements OnInit {
  /** logout constructor */
  constructor(private userService: UserService, private router: Router) {
  }

  /** on init */
  ngOnInit() {
    this.userService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }
}
