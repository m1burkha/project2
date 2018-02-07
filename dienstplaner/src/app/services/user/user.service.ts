import {Injectable, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';

/**
 * user service for authentification and registration
 */
@Injectable()
export class UserService implements OnInit {
    /** current user */
    user: firebase.User;

    /**
     * initializes user service
     */
    constructor(private afAuth: AngularFireAuth) {
      firebase.auth().useDeviceLanguage();
    }

    /**
     * on init
     */
    ngOnInit() {
        this.authState.subscribe(e => {
            this.user = e;
        });
    }

    /**
     * returns observable on auth state
     */
    get authState(): Observable<firebase.User> {
        return this.afAuth.authState;
    }

    /**
     * logs user in
     * @param email email address
     * @param password password
     */
    login(email: string, password: string): Promise<firebase.User> {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }

    /**
     * logs user out
     */
    logout(): Promise<firebase.User> {
        return firebase.auth().signOut();
    }

    /**
     * creates an user
     * @param username username or displayName
     * @param email email address
     * @param password password
     */
    create(username: string, email: string, password: string): Promise<firebase.User> {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then((e: firebase.User) => {
            return e.updateProfile({displayName: username, photoURL: e.photoURL});
        });
    }

    /**
     * updates an username
     * @param username username or displayName
     */
    updateUserName(username: string): Promise<firebase.User> {
        return this.user.updateProfile({displayName: username, photoURL: this.user.photoURL});
    }

    /**
     * updates an password
     * @param password password
     */
    updatePassword(password: string): Promise<firebase.User> {
        return this.user.updatePassword(password);
    }

}
