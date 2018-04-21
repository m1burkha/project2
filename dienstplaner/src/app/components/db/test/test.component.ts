import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {UserService} from '@services/user/user.service';
import {ShiftScheduleService} from '@services/shift-scheduling/shift-scheduling.service';
import {IShiftSchedule} from '@domain-models/shift-scheduling/shift-schedule';
import {ShiftType} from '@domain-models/shift-scheduling/shift-type.enum';
import {EmployeeShiftItem} from '@domain-models/shift-scheduling/employee-shift-item';

/** TestItem class */
class TestItem {
  /** name */
  name: string;
  /** prename  */
  prename: string;
  /** age */
  age: number;
  /**date of birth */
  dateOfBirth: Date;
}

/** TestComponent component */
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
/** TestComponent class */
export class TestComponent implements OnInit {
  /**  items array*/
  items: Observable<TestItem[]>;
  /** usename*/
  username: string;
  /** firebase user*/
  user: firebase.User;
  /** authentication sate*/
  authState: Observable<firebase.User>;

  /**
   * constructor
   * @param {AngularFirestore} db
   * @param {UserService} userService
   * @param {ShiftScheduleService} shiftSchedulingService
   */
  constructor(db: AngularFirestore, private userService: UserService, private shiftSchedulingService: ShiftScheduleService) {
    const collection = db.collection<TestItem>('items');
    this.items = collection.valueChanges();
    this.items.subscribe(e => {
      console.log('items', e);
    });
    const test = db.firestore.collection('items').get();
    test.then(e => console.log('test', e));
  }

  /** ng oninit */
  ngOnInit() {
    this.authState = this.userService.authState;
    this.userService.authState.subscribe(e => {
      console.log('auth state changed', e);
      this.username = e.displayName;
      this.user = e;
    });
    this.readAllShiftSchedulingItems();
  }

  /**  create and test service*/
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

  /** test signin */
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

  /** test update user */
  updateUser() {
    this.userService.updateUserName(this.username)
      .then(e => {
        console.log('updated', e);
      }, e => {
        console.log('error', e);
      });
  }

  /** test read all shifschedules */
  readAllShiftSchedulingItems() {
    this.shiftSchedulingService.readAll().subscribe(e => {
      console.log('items', e);
    });
  }

  /** test create a shift schedule  */
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

  /**login */
  login() {

  }

  /**logout */
  logout() {

  }
}
