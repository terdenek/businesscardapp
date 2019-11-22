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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CreateContactComponent,
    NotFoundComponent
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
