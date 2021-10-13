import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as fromRoot from '../../app.reducer';
import { UiService } from '../../shared/ui.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  isLoading$: Observable<boolean> = of(false);

  // private loadingSubs!: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UiService,
    private store: Store<fromRoot.IState>,
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
    //   (loading: boolean) => {
    //     this.isLoading = loading;
    //   },
    // );
  }

  onSubmit(form: NgForm) {
    const user = {
      email: form.value.email,
      password: form.value.password,
    };
    this.authService.registerUser(user);
  }

  // ngOnDestroy(): void {
  //   if (this.loadingSubs) {
  //     this.loadingSubs.unsubscribe();
  //   }
  // }
}
