import { Component } from '@angular/core';

@Component({
  selector: 'app-shiftlist',
  templateUrl: './shiftlist.component.html',
  styleUrls: ['./shiftlist.component.scss']
})
export class ShiftlistComponent {
  displayedColumns = ['date', 'person1', 'person2'];
  dataSource  = [
    {date: 'Do, 01.02.2018', person1: '', person2: '', tooltip_person1: 'hier kann ein oder mehrere Templates (shift-item) ausgewählt werden'},
    {date: 'Fr, 02.02.2018', person1: '', person2: ''},
    {date: 'Sa, 03.02.2018', person1: 'Samstag-Frühschicht', person2: ''},
    {date: 'So, 04.02.2018', person1: '', person2: ''},
    {date: 'Mo, 05.02.2018', person1: 'Frühschicht', person2: 'Spätschicht'},
    {date: 'Di, 06.02.2018', person1: 'Frühschicht', person2: 'Spätschicht'},
    {date: 'Mi, 07.02.2018', person1: 'Frühschicht', person2: 'Mittelschicht'},
    {date: 'Do, 08.02.2018', person1: 'Mittelschicht', person2: 'Frühschicht'},
    {date: 'Fr, 09.02.2018', person1: 'Spätschicht', person2: 'Frühschicht'},
    {date: 'Sa, 10.02.2018', person1: '', person2: 'Samstag-Frühschicht'},
    {date: 'So, 11.02.2018', person1: '', person2: ''},
    {date: 'Mo, 12.02.2018', person1: 'Frühschicht', person2: 'Spätschicht'},
    {date: 'Di, 13.02.2018', person1: 'Frühschicht', person2: 'Spätschicht'},
    {date: 'Mi, 14.02.2018', person1: 'Frühschicht', person2: 'Mittelschicht'},
    {date: 'Do, 15.02.2018', person1: 'Mittelschicht', person2: 'Frühschicht'},
    {date: 'Fr, 16.02.2018', person1: 'Spätschicht', person2: 'Frühschicht'},
    {date: 'Sa, 17.02.2018', person1: '', person2: 'Samstag-Frühschicht'},
    {date: 'So, 18.02.2018', person1: '', person2: ''},
    {date: 'Mo, 19.02.2018', person1: 'Urlaub', person2: ''},
    {date: 'Di, 20.02.2018', person1: 'Urlaub', person2: ''},
    {date: 'Mi, 21.02.2018', person1: 'Urlaub', person2: ''},
    {date: 'Do, 22.02.2018', person1: 'Urlaub', person2: ''},
    {date: 'Fr, 23.02.2018', person1: 'Urlaub', person2: ''},
    {date: 'Sa, 24.02.2018', person1: 'Urlaub', person2: ''},
    {date: 'So, 25.02.2018', person1: '', person2: ''},
    {date: 'Mo, 26.02.2018', person1: '', person2: 'Feiertag'},
    {date: 'Di, 27.02.2018', person1: '', person2: ''},
    {date: 'Mi, 28.02.2018', person1: '', person2: ''},
    {total: 'Soll-Stunden', person1: '132.2', person2: '187.9', tooltip_person1: 'wird aus den Werten in der Liste berechnet', tooltip_person2: 'wird aus den Werten in der Liste berechnet'},
    {total: 'Urlaubssaldo', person1: '8.7', person2: '17.2', tooltip_person1: 'wird aus den Werten in der Liste berechnet', tooltip_person2: 'wird aus den Werten in der Liste berechnet'},
    {total: 'Feiertagsaldo', person1: '1.7', person2: '2.4', tooltip_person1: 'wird aus den Werten in der Liste berechnet', tooltip_person2: 'wird aus den Werten in der Liste berechnet'},
  ];
  templates = [
    'Frühschicht',
    'Spätschicht',
    'Mittelschicht',
    'Samstag-Frühschicht',
    'Kompensation',
    'Urlaub',
    'Feiertag',
    'Krank',
    'Militär',
    'Weiterbildung',
    'unbezahlter Urlaub'
  ];
}
