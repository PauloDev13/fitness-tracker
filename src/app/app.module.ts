import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NavigationModule } from './components/navigation.module';
import { SharedModule } from './shared/shared.module';
import { TrainingModule } from './training/training.module';
import { WelcomeModule } from './welcome/welcome.module';

registerLocaleData(localePT);

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    //AngularFirestoreModule,
    // AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    NavigationModule,
    TrainingModule,
    WelcomeModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
