import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor() { }

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(
            (user: firebase.auth.UserCredential) => {
              console.log('New user created', user);
              resolve();
            },
            (error: any) => {
              reject(error);
            }
          );
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(
            (user: firebase.auth.UserCredential) => {
              console.log('New user created', user);
              resolve();
            },
            (error: any) => {
              reject(error);
            }
          );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }
}
