import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducer } from './app.reducer';
import { AuthModule } from './auth/auth.module';
import { NavigationModule } from './components/navigation.module';
import { SharedModule } from './shared/shared.module';
import { WelcomeModule } from './welcome/welcome.module';

registerLocaleData(localePT);

@NgModule({
  declarations: [AppComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    StoreModule.forRoot({ ui: appReducer }),
    // AngularFirestoreModule,
    // AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    NavigationModule,
    WelcomeModule,
    SharedModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
