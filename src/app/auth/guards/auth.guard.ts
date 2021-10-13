import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import * as fromRoot from '../../app.reducer';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromRoot.IState>,
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    // if (this.authService.isAuth()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']).then();
    //   return false;
    // }
  }

  canLoad(): Observable<boolean> | boolean {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    // if (this.authService.isAuth()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']).then();
    //   return false;
    // }
  }
}
