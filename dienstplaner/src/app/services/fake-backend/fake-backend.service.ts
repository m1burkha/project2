import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';


@Injectable()
export class FakeBackendService implements HttpInterceptor {

  /**
   * Intercept all http requests when no backend available
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.endsWith('api/login') && req.method === 'POST') {
      if (req.body.username === 'test' && req.body.password === 'test') {

        const createdate = new Date();
        const expdate = new Date();
        createdate.setHours(createdate.getHours() + 2);
        return Observable.of(new HttpResponse({
          status: 200,
          body: {
            'sub': '1234',
            'exp': expdate,
            'iat': createdate
          }
        }));
      } else {
        return Observable.throw('Username or password incorrect');
      }
    }
    return next.handle(req);
  }
}

/**
 * // use fake backend in place of Http service for backend-less development
 * @type {{provide: InjectionToken<HttpInterceptor[]>; useClass: FakeBackendService; multi: boolean}}
 */
export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendService,
  multi: true
};
