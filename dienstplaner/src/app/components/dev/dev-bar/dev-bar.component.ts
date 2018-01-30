<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import {Component, OnInit} from '@angular/core';
>>>>>>> development

/**
 * dev bar component
 */
@Component({
  selector: 'app-dev-bar',
  templateUrl: './dev-bar.component.html',
  styleUrls: ['./dev-bar.component.scss']
})
<<<<<<< HEAD
export class DevBarComponent {
=======
export class DevBarComponent implements OnInit {

  bypassLogin: Boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleLoginBypass() {
    this.bypassLogin = !this.bypassLogin;
  }

>>>>>>> development
}
