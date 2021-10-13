import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TypeState } from '../../app.reducer';
import { UiService } from '../../shared/ui.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  isLoading$!: Observable<boolean>;
  // isLoading = false;
  // private loadingSubs!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private uiService: UiService,
    private store: Store<{ ui: TypeState }>,
  ) {}

  ngOnInit(): void {
    // this.store.subscribe((data) => (this.isLoading = data.ui.isLoading));
    // console.log(this.isLoading);
    this.isLoading$ = this.store.pipe(map((state) => state.ui.isLoading));

    // this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
    //   (loading: boolean) => {
    //     this.isLoading = loading;
    //   },
    // );
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(user);
  }

  // ngOnDestroy(): void {
  //   if (this.loadingSubs) {
  //     this.loadingSubs.unsubscribe();
  //   }
  // }
}
