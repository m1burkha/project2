import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import DocumentReference = firebase.firestore.DocumentReference;
import {Observable} from 'rxjs/Observable';

/**
 * firestore service
 */
@Injectable()
export class FirestoreService<T> {
  /** firestorecollection */
  private collection: AngularFirestoreCollection<T>;

  /**
   * initializes service
   * @param {AngularFirestore} db firestore db
   */
  constructor(protected db: AngularFirestore) {
    firebase.auth().useDeviceLanguage();
  }

  /**
   * initializes collection
   * @param {string} collection collection name
   */
  protected setCollection(collection: string): void {
    this.collection = this.db.collection(collection);
  }

  /**
   * initializes subcollection
   * @param {string} collection collection name
   * @param {string} document document name
   * @param {string} subcollection subcollection name
   */
  protected setSubCollection(collection: string, document: string, subcollection: string): void {
    this.collection = this.db.collection(collection).doc(document).collection(subcollection);
  }

  /**
   * creates a document from object
   * @param {T} object object to store
   * @returns {Promise<DocumentReference>} id
   */
  public create(object: T): Promise<DocumentReference> {
    if (!this.collection) {
      throw Error('collection not set');
    }

    // update, if id is set
    if (object.hasOwnProperty('id') && object['id'] !== null && object['id'] !== '') {
      this.update(object['id'], object);
    } else {
      // return this.collection.add(object);
      return this.collection.add(JSON.parse(JSON.stringify(object))).then(e => {
        if (object.hasOwnProperty('id') && (object['id'] == null || object['id'] === '')) {
          object['id'] = e.id;
          this.update(e.id, object);
        }
        return e;
      });
    }
  }

  /**
   * gets a document
   * @param {string} id id of document
   * @returns {AngularFirestoreDocument<T>} document
   */
  public read(id: string): AngularFirestoreDocument<T> {
    if (!this.collection) {
      throw Error('collection not set');
    }
    return this.collection.doc(id);
  }

  /**
   * gets all document
   * @returns {AngularFirestoreDocument<T>} document
   */
  public readAll(): Observable<T[]> {
    if (!this.collection) {
      throw Error('collection not set');
    }
    return this.collection.valueChanges();
  }

  /**
   * updates a document
   * @param {string} id id of document
   * @param {T} object content of document
   * @returns {Promise<void>} update status
   */
  public update(id: string, object: T): Promise<void> {
    if (!this.collection) {
      throw Error('collection not set');
    }
    return this.collection.doc(id).set(JSON.parse(JSON.stringify(object)));
  }

  /**
   * updates a document
   * @param {string} id id of document
   * @param {T} object content of document
   * @returns {Promise<void>} update status
   */
  public updatePartial(id: string, object: Partial<T>): Promise<void> {
    if (!this.collection) {
      throw Error('collection not set');
    }
    return this.collection.doc(id).update(object);
  }

  /**
   * deletes a document
   * @param {string} id id of document
   * @returns {Promise<void>} delete status
   */
  public delete(id: string): Promise<void> {
    if (!this.collection) {
      throw Error('collection not set');
    }
    return this.collection.doc(id).delete();
  }
}
