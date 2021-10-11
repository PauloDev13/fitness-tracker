import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

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
    private snackbar: MatSnackBar,
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
    const { email, password } = authData;
    this.FirebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.snackbar.open('Cadastro realizado com sucesso', 'Fechar', {
          duration: 2000,
        });
      })
      .catch(() => {
        this.snackbar.open('E-mail já cadastrado', 'Fechar', {
          duration: 2000,
        });
      });
  }

  login(authData: AuthData): void {
    const { email, password } = authData;
    this.FirebaseAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.snackbar.open('Login realizado com sucesso', 'Fechar', {
          duration: 2000,
        });
      })
      .catch(() => {
        this.snackbar.open('Usuário e/ou Senha inválido', 'Fechar', {
          duration: 2000,
        });
      });
  }

  logout(): void {
    this.FirebaseAuth.signOut().then();
  }

  isAuth(): boolean {
    return this.isAuthenticated;
  }
}
