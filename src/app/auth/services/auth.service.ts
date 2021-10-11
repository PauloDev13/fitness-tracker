import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from '../models/auth-data-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private FirebaseAuth: AngularFireAuth) {}

  registerUser(authData: AuthData) {
    const { email, password } = authData;
    this.FirebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.authSuccessfully();
      })
      .catch((error) => console.log(error));
    // this.user = {
    //   email: authData.email,
    //   password: authData.password,
    //   userId: Math.round(Math.random() * 10000).toString(),
    // };
  }

  login(authData: AuthData) {
    const { email, password } = authData;
    this.FirebaseAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.authSuccessfully();
      })
      .catch((error) => console.log(error));
    // this.user = {
    //   email: authData.email,
    //   password: authData.password,
    // };
    //
    // this.authSuccessfully();
  }

  logout() {
    this.authChange.next(false);
    this.router.navigate(['/login']).then();
    this.isAuthenticated = false;
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

  private authSuccessfully(): void {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']).then();
  }
}
