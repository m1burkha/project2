import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

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

    /**
     * creates component
     */
    constructor() {
    }

    /**
     * initializes component
     */
    ngOnInit() {
        this.debugMode = !environment.production;
    }

}
