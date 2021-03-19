import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { GoogleSigninService } from 'src/app/services/google-signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
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
      .signin(email, password)
      .then(() => {
        this.router.navigateByUrl('home');
        this.toastr.info('Signed In Successfully😋');
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error(err.message);
      });
  }

  handleGoogleSignIn() {
    this.gSignIn
      .googleSignup()
      .then((result) => {
        var user = result.user;

        this.router.navigateByUrl('home');
        this.toastr.info('Signed In Successfully 😋');
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error(err.message);
      });
  }
}
