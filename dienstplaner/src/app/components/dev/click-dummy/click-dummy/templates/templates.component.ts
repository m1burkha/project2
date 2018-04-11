import {Component} from '@angular/core';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent {
  displayedColumns = ['caption', 'type', 'timespans', 'totalhours'];
  dataSource = [
    {
      caption: 'Frühschicht', type: 'working', timespans: [
        {start: '07:00', end: '11:30', totalhours: 4.5},
        {start: '12:30', end: '16:30', totalhours: 4},
      ], totalhours: 8.5
    },
    {
      caption: 'Spätschicht', type: 'working', timespans: [
        {start: '09:00', end: '12:30', totalhours: 3.5},
        {start: '13:30', end: '18:30', totalhours: 5},
      ], totalhours: 8.5
    },
    {
      caption: 'Mittelschicht', type: 'working', timespans: [
        {start: '08:00', end: '12:00', totalhours: 4},
        {start: '13:00', end: '17:00', totalhours: 4.5},
      ], totalhours: 8.5
    },
    {
      caption: 'Samstags-Frühschicht', type: 'working', timespans: [
        {start: '07:00', end: '11:00', totalhours: 4},
        {start: '12:00', end: '15:00', totalhours: 3},
      ], totalhours: 7
    },
    {
      caption: 'Kompensation', type: 'compensation', timespans: [], totalhours: 8.5,
      tooltip_totalhours: 'benötigt Stunden, da diese als Soll-Stunden hinzugefügt werden'
    },
    {
      caption: 'Urlaub', type: 'holiday', timespans: [], totalhours: 8.5,
      tooltip_totalhours: 'benötigt Stunden, da diese als Ist-Stunden abgezogen werden'
    },
    {
      caption: 'Feiertag', type: 'holiday', timespans: [], totalhours: 8.5,
      tooltip_totalhours: 'benötigt Stunden, da diese als Ist-Stunden abgezogen werden'
    },
    {
      caption: 'Krank', type: 'paid-absence', timespans: [], totalhours: 0,
      tooltip_totalhours: 'es werden weder Stunden aufgebaut, noch abgezogen'
    },
    {
      caption: 'Militär', type: 'paid-absence', timespans: [], totalhours: 0,
      tooltip_totalhours: 'es werden weder Stunden aufgebaut, noch abgezogen'
    },
    {
      caption: 'Weiterbildung', type: 'paid-absence', timespans: [], totalhours: 0,
      tooltip_totalhours: 'es werden weder Stunden aufgebaut, noch abgezogen'
    },
    {
      caption: 'unbezahlter Urlaub', type: 'unpaid-absence', timespans: [], totalhours: 0,
      tooltip_totalhours: 'es werden weder Stunden aufgebaut, noch abgezogen'
    },
  ];
}
