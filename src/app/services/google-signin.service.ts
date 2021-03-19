import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';

import firebase from 'firebase/app';

import 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export class GoogleSigninService {
  provider = new firebase.auth.GoogleAuthProvider();

  constructor(private auth: AngularFireAuth) {}

  googleSignup() {
    return this.auth.signInWithPopup(this.provider);
  }
}
