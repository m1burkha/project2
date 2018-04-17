import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent {

  presentationIndex: number;

  constructor() {
    this.presentationIndex = 0;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 37) {
      this.presentationIndex--;
    }else {
      this.presentationIndex++;
    }
  }
}
