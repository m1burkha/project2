import {Injectable} from '@angular/core';
import {FirestoreService} from '@services/firestore/firestore.service';
import {ShiftItem} from '@domain-models/shift-scheduling/shift-item';
import {AngularFirestore} from 'angularfire2/firestore';

/**
 * service for shift items
 */
@Injectable()
export class ShiftItemsService extends FirestoreService<ShiftItem> {

  /**
   * initializes ShiftItem service
   * @param {AngularFirestore} db angular firestore
   */
  constructor(db: AngularFirestore) {
    super(db);
    this.setCollection('ShiftItems');
  }

}
