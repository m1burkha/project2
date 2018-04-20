import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {UserService} from '@services/user/user.service';
import {ShiftScheduleService} from '@services/shift-scheduling/shift-scheduling.service';
import {IShiftSchedule} from "@domain-models/shift-scheduling/shift-schedule";
import {ShiftType} from "@domain-models/shift-scheduling/shift-type.enum";
import {EmployeeShiftItem} from "@domain-models/shift-scheduling/employee-shift-item";
import {ShiftItem} from "@domain-models/shift-scheduling/shift-item";


class TestItem {
  name: string;
  prename: string;
  age: number;
  dateOfBirth: Date;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  items: Observable<TestItem[]>;
  username: string;
  user: firebase.User;
  authState: Observable<firebase.User>;

  constructor(db: AngularFirestore, private userService: UserService, private shiftSchedulingService: ShiftScheduleService) {
    const collection = db.collection<TestItem>('items');
    this.items = collection.valueChanges();
    this.items.subscribe(e => {
      console.log('items', e);
    });
    const test = db.firestore.collection('items').get();
    test.then(e => console.log('test', e));
  }

  ngOnInit() {
    this.authState = this.userService.authState;
    this.userService.authState.subscribe(e => {
      console.log('auth state changed', e);
      this.username = e.displayName;
      this.user = e;
    });
    this.readAllShiftSchedulingItems();
  }

  create() {
    this.userService.create('Marc', 'info@marc-iten.ch', 'Q"w3Eçr5')
      .catch(error => {
        // Handle Errors here.
        if (error.code === 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(error.message);
        }
        console.log('error', error);
      });
  }

  signin() {
    this.userService.login(this.user.email === 'info@marc-iten.ch' ? 'marc@iten.ch' : 'info@marc-iten.ch', 'Q"w3Eçr5')
      .then(e => {
        console.log('logged in', e);
      })
      .catch(error => {
        // Handle Errors here.
        if (error.code === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert(error.message);
        }
        console.log('error', error);
      });
  }

  updateUser() {
    this.userService.updateUserName(this.username)
      .then(e => {
        console.log('updated', e);
      }, e => {
        console.log('error', e);
      });
  }

  readAllShiftSchedulingItems() {
    this.shiftSchedulingService.readAll().subscribe(e => {
      console.log('items', e);
    });
  }

  createShiftScheduling() {
    const employeeShiftItem = [Object.assign(EmployeeShiftItem.prototype,
      {employeeId: ''}, {shiftItem: {type: ShiftType.workingShift}})];
    const ss: IShiftSchedule = {
      id: '', date: new Date('12.12.2018'),
      selectedShiftColumnOfEmployees: employeeShiftItem
    };
    this.shiftSchedulingService.create(ss).then(e => {
      console.log('document reference', e);
      console.log('id', e.id);
      ss.selectedShiftColumnOfEmployees[0].shiftItem.id = e.id;
    });
  }

  login() {

  }

  logout() {

  }
}
