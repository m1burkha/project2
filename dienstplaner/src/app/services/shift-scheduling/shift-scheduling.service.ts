import {Injectable} from '@angular/core';
import {FirestoreService} from '@services/firestore/firestore.service';
import {IShiftScheduling} from '@domain-models/shift-scheduling/shift-scheduling';
import {AngularFirestore} from 'angularfire2/firestore';

/**
 * shift scheduling service
 */
@Injectable()
export class ShiftSchedulingService extends FirestoreService<IShiftScheduling> {

    /**
     * initializes shift scheduling service
     * @param {AngularFirestore} db angular firestore
     */
    constructor(db: AngularFirestore) {
        super(db);
        this.setCollection('ShiftScheduling');
    }

}
