import {Component, HostListener} from '@angular/core';

/** PresentationComponent component */
@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
/** PresetationComponent class */
export class PresentationComponent {
  /** presentation index */
  presentationIndex: number;

  /** constructor */
  constructor() {
    this.presentationIndex = 0;
  }

  /**
   * Keyboard event handler
    * @param {KeyboardEvent} event
   */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 37) {
      this.presentationIndex--;
    }else {
      this.presentationIndex++;
    }
  }
}
