import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from '../../../app.reducer';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output()
  sidenavToggle = new EventEmitter<void>();
  // isAuth = false;
  isAuth$!: Observable<boolean>;

  // authSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.IState>,
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    // this.authSubscription = this.authService.authChange.subscribe(
    //   (authState: boolean) => {
    //     this.isAuth = authState;
    //   },
    // );
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout(): void {
    this.authService.logout();
  }

  // ngOnDestroy(): void {
  //   if (this.authSubscription) {
  //     this.authSubscription.unsubscribe();
  //   }
  // }
}
