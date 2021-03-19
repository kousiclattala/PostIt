import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

import { AddpostComponent } from '../app/pages/addpost/addpost.component';
import { HomeComponent } from '../app/pages/home/home.component';
import { SigninComponent } from '../app/pages/signin/signin.component';
import { SignupComponent } from '../app/pages/signup/signup.component';
import { PageNotFoundComponent } from '../app/pages/page-not-found/page-not-found.component';
import { PageLoadComponent } from '../app/layouts/page-load/page-load.component';
import { ProfileComponent } from '../app/pages/profile/profile.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo('signin');
const redirectLoggedInToHome = () => redirectLoggedInTo('home');

const routes: Routes = [
  {
    path: '',
    component: PageLoadComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome },
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
  },
  {
    path: 'addpost',
    component: AddpostComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
