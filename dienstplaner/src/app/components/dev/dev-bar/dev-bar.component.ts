import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dev-bar',
  templateUrl: './dev-bar.component.html',
  styleUrls: ['./dev-bar.component.scss']
})
export class DevBarComponent implements OnInit {

  bypassLogin: Boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleLoginBypass() {
    this.bypassLogin = !this.bypassLogin;
  }

}
