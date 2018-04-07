import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';


@Injectable()
export class FakeBackendService implements HttpInterceptor {

  constructor(private http: HttpClient) {
  }

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

  readAllShifts(year: string, month: string): Observable<any> {
    console.log('in read all');
    let pp = this.http.get('../../assets/mockdata/shiftSchedules.json');
    pp.subscribe(x => console.log(x));
    return this.http.get('../../assets/mockdata/shiftSchedules.json');
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
