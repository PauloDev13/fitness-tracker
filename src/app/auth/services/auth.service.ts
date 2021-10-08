import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AuthData } from '../models/auth-data-model';
import { User } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authChange = new Subject<boolean>();
  private user: User = { email: '', password: '' };

  constructor() {}

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      password: authData.password,
      userId: Math.round(Math.random() * 10000).toString(),
    };

    this.authChange.next(true);
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      password: authData.password,
    };

    this.authChange.next(true);
  }

  logout() {
    this.user = { email: '', password: '' };
    this.authChange.next(false);
  }

  getUser(): User {
    return { ...this.user };
  }

  isAuth(): boolean {
    return !this.getUser();
  }
}
