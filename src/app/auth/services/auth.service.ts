import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from '../models/auth-data-model';
import { User } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authChange = new Subject<boolean>();
  private user!: User;

  constructor(private router: Router, private FirebaseAuth: AngularFireAuth) {}

  registerUser(authData: AuthData) {
    const { email, password } = authData;
    this.FirebaseAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
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
      .then((result) => {
        console.log(result);
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
    this.user = { email: '', password: '' };
    this.authChange.next(false);
    this.router.navigate(['/login']).then();
  }

  getUser(): User {
    return { ...this.user };
  }

  isAuth(): boolean {
    return this.user !== undefined;
  }

  private authSuccessfully(): void {
    this.authChange.next(true);
    this.router.navigate(['/training']).then();
  }
}
