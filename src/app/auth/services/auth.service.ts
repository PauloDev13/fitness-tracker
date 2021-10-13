import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { TypeState } from '../../app.reducer';
import { UiService } from '../../shared/ui.service';
import { TrainingService } from '../../training/training.service';
import { AuthData } from '../models/auth-data-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private FirebaseAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<{ ui: TypeState }>,
  ) {}

  initAuthListener(): void {
    this.FirebaseAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']).then();
        return;
      }
      this.trainingService.cancelSubscriptions();
      this.authChange.next(false);
      this.router.navigate(['/login']).then();
      this.isAuthenticated = false;
    });
  }

  registerUser(authData: AuthData): void {
    this.store.dispatch({ type: 'START_LOADING' });
    // this.uiService.loadingStateChanged.next(true);

    const { email, password } = authData;
    this.FirebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.store.dispatch({ type: 'STOP_LOADING' });
        // this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(
          'Cadastro realizado com sucesso',
          'Fechar',
          2000,
        );
      })
      .catch(() => {
        this.store.dispatch({ type: 'STOP_LOADING' });
        // this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbarSimple('E-mail já cadastrado');
      });
  }

  login(authData: AuthData): void {
    this.store.dispatch({ type: 'START_LOADING' });
    // this.uiService.loadingStateChanged.next(true);

    const { email, password } = authData;
    this.FirebaseAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.store.dispatch({ type: 'STOP_LOADING' });
        // this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbarSimple('Login realizado com sucesso');
      })
      .catch(() => {
        this.store.dispatch({ type: 'STOP_LOADING' });
        // this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbarSimple('Usuário e/ou Senha inválido');
      });
  }

  logout(): void {
    this.FirebaseAuth.signOut().then();
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }
}
