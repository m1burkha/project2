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
  /** if menu is shown */
  showMenu: Boolean = false;

  /**
   * toggles bypass login
   */
  toggleLoginBypass() {
    this.bypassLogin = !this.bypassLogin;
  }

  /**
   * toggles menu
   */
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

}
