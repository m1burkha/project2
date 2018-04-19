import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import * as firebase from 'firebase/app';

/**
 * App Component - base component with router-outlet
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    /** if debug mode or production mode */
    debugMode: boolean;

    /** if user is logged in */
    loggedIn: boolean;

    /**
     * creates component
     */
    constructor() {
      this.loggedIn = false;
      firebase.initializeApp(environment.firebase);
      firebase.auth().onAuthStateChanged(user => this.loggedIn = !!user);
    }

    /**
     * initializes component
     */
    ngOnInit() {
        this.debugMode = !environment.production;
    }

}
