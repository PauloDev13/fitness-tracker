import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as fromRoot from '../../app.reducer';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {
  @Output()
  sidenavClose = new EventEmitter<void>();
  isAuth$: Observable<boolean> = of(false);
  // isAuth = false;
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

  onClose() {
    this.sidenavClose.emit();
  }

  onLogout(): void {
    this.onClose();
    this.authService.logout();
  }

  // ngOnDestroy(): void {
  //   this.authSubscription.unsubscribe();
  // }
}
