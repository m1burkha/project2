import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Injectable()
export class LoginGuard implements CanActivate {

  /**
   * constructor inject authenticationservice and router
   * @param {AuthenticationService} authenticationService
   * @param {Router} router
   */
  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  /**
   * loginguard if valid will allow router to navigate to the next page
   * @returns {boolean}
   */
  canActivate() {

    if (sessionStorage.getItem('auth_token') && this.authenticationService.isTokenValid()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;

  }
}
