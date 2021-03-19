import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user = null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.auth.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  handleSignOut() {
    this.auth
      .signout()
      .then(() => {
        this.router.navigateByUrl('');
        this.toastr.info('Loggedout Successfully😋');
      })
      .catch((err) => {
        console.log(err);
        this.toastr.error('There is error in LogOut😔');
      });
  }
}
