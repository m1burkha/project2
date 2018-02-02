import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {UserService} from '@services/user/user.service';

@Injectable()
export class LoginGuard implements CanActivate {

  /**
   * constructor inject authenticationservice and router
   * @param {AuthenticationService} authenticationService
   * @param {Router} router
   */
  constructor(private userService: UserService, private router: Router) {
  }

  /**
   * loginguard if valid will allow router to navigate to the next page
   * @returns {boolean}
   */
  canActivate() {
    // TODO remove once user created.....
    return true;
    // .......

    // if (sessionStorage.getItem('auth_token') && this.userService.authState) {
    //   return true;
    // }
    // this.router.navigate(['/login']);
    // return false;

  }
}
