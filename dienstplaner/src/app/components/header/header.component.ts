import {Component, Input, OnInit} from '@angular/core';
/** HeaderComponent component */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
/** HeaderComponent class */
export class HeaderComponent implements OnInit {
  /** header text input */
  @Input() headerText: string;
  /** icon input */
  @Input() iconName: string;

  /** constructor */
  constructor() {
  }
  /** on init */
  ngOnInit() {
  }

}
