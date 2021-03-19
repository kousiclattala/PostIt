import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';
import { GoogleSigninService } from '../../services/google-signin.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private gSignIn: GoogleSigninService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit(userForm: NgForm) {
    const { email, password } = userForm.form.value;

    this.auth
      .signup(email, password)
      .then(() => {
        this.router.navigateByUrl('profile');
        this.toastr.success('SignedUp Successfully 😋');
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error('There is an Error in SignUp');
      });
  }

  handleGoogleSignup() {
    this.gSignIn
      .googleSignup()
      .then((result) => {
        var credential = result.credential;

        var user = result.user;

        this.router.navigateByUrl('home');

        this.toastr.success('SignedUp Successfully 😋');
      })
      .catch((err) => {
        var errCode = err.code;
        var errMessage = err.message;
        var email = err.email;
        var credential = err.credential;

        console.log(err);
        console.log(errCode + errMessage + email + credential);

        this.toastr.error('There is an Error in GoogleSignIn');
      });
  }
}
