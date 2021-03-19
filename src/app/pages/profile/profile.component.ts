import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  displayPicture;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const { profilePicture, userName } = form.form.value;

    this.displayPicture = profilePicture;

    this.auth.getUser().subscribe((user) => {
      user
        .updateProfile({
          displayName: userName,
          photoURL: profilePicture,
        })
        .then(() => {
          this.toastr.info('Profile Updated😀');
          this.router.navigateByUrl('home');
        })
        .catch((err) => {
          console.log(err);
          this.toastr.error(err);
        });
    });
  }
}
