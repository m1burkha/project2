import {Component} from '@angular/core';

/**
 * dev bar component
 */
@Component({
    selector: 'app-dev-bar',
    templateUrl: './dev-bar.component.html',
    styleUrls: ['./dev-bar.component.scss']
})
export class DevBarComponent {
    /** bypass login */
    bypassLogin: Boolean = false;

    /**
     * toggles bypass login
     */
    toggleLoginBypass() {
        this.bypassLogin = !this.bypassLogin;
    }

}
