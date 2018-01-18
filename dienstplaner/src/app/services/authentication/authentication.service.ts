import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/shareReplay';
import {Token} from '../../domain-models/token/token';

@Injectable()
export class AuthenticationService {

  /**
   * AuthenticationService constructor injecting the httpclient
   * @param {HttpClient} httpClient
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * user login and authentication, sets the token and expire date in the sessionstorage
   * @param {string} username
   * @param {string} pwd
   * @returns {Observable<boolean>}
   */
  login(username: string, pwd: string): Observable<boolean> {

    // let headers = new Headers();
    // headers.append('Authorization', btoa('username:password'));
    // let opts = new RequestOptions();
    // opts.headers = headers;

    // const headers = {headers: new HttpHeaders().set('loginuser', username)};
    return this.httpClient.post('/api/login', {username: username, password: pwd})
      .map((response: Response) => {
        console.log(response);
        const token = Object.assign(Object.create(Token.prototype), response);
        if (token) {
          sessionStorage.setItem('auth_token', JSON.stringify({token: token.sub}));
          sessionStorage.setItem('token_expires_at', JSON.stringify({expire_date: token.exp}));
          return true;
        } else {
          return false;
        }
      })
      .shareReplay();
  }

  /**
   * Check to see if the token is still valid for our session, used for routing
   * @returns {boolean}
   */
  isTokenValid(): boolean {
    const tokenDate = sessionStorage.getItem('token_expires_at');
    return Date.now().toLocaleString() < tokenDate;
  }

  /** logout , clear sessionstorage    */
  logout() {
    sessionStorage.removeItem('current_user');
    sessionStorage.removeItem('token_expires_at');
  }
}
