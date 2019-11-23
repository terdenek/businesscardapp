import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { environment } from '../environments/environment';
// firebase modules
import * as firebase from 'firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
// components
import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { CreateContactComponent } from './screens/create-contact/create-contact.component';
import { NotFoundComponent } from './screens/not-found/not-found.component';
// services
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UtilityBarComponent } from './components/utility-bar/utility-bar.component';
import { ContactCardComponent } from './components/contact-card/contact-card.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CreateContactComponent,
    NotFoundComponent,
    NavbarComponent,
    UtilityBarComponent,
    ContactCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, // auth
    AngularFirestoreModule, // firestore
    AngularFireStorageModule, // storage
    AppRoutingModule,
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
