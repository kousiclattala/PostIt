import { Injectable, OnInit } from '@angular/core';

//* AngularFire imports

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  constructor(private auth: AngularFireAuth) {}

  ngOnInit() {}
  getUser() {
    return this.auth.authState;
  }

  signup(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signin(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signout() {
    return this.auth.signOut();
  }
}
