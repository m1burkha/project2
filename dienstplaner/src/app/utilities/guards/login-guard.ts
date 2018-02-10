import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import * as firebase from "firebase/app";
import {environment} from "../../../environments/environment";

@Injectable()
export class LoginGuard implements CanActivate {

  /**
   * constructor inject authenticationservice and router
   */
  constructor(private router: Router) {
    if (!firebase.apps.length) firebase.initializeApp(environment.firebase);
  }

  /**
   * loginguard if valid will allow router to navigate to the next page
   */
  canActivate() {
    let resultObserver: Observer<boolean>;
    let resultObs = new Observable<boolean>(observer => {
      resultObserver = observer;
    });

    firebase.auth().onAuthStateChanged(user => {
      resultObserver.next(!!user);
      if (!user) this.router.navigate(['/login']);
      resultObserver.complete();
    });
    return resultObs;
  }
}
