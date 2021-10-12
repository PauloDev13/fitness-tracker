import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { StopTrainingComponent } from './components/dialogs/stop-training.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { MaterialModule } from './material.module';
import { MyCustomPaginatorIntl } from './shared/my-custom-paginator-intl';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingComponent } from './training/past-training/past-training.component';
import { TrainingComponent } from './training/training.component';
import { WelcomeComponent } from './welcome/welcome.component';

registerLocaleData(localePT);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    WelcomeComponent,
    SignupComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
  bootstrap: [AppComponent],
})
export class AppModule {}
