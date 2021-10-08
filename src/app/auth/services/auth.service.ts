import { Injectable } from '@angular/core';
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

  constructor(private router: Router) {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      password: authData.password,
      userId: Math.round(Math.random() * 10000).toString(),
    };

    this.authSuccessfully();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      password: authData.password,
    };

    this.authSuccessfully();
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
