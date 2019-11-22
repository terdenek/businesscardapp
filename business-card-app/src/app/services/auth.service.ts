import { Injectable, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth){}
  @Output() authChangeListener: EventEmitter<any> = new EventEmitter();

  login(email: string, password: string) {
    // set false on request
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.getCurrentUserToken(); 
        resolve(res);
      }, err => reject(err))
    })
  }

  logout(){
    this.afAuth.auth.signOut().then(
      () => {
        this.authChangeListener.emit();
      }
    );
    localStorage.removeItem('isLoggedIn');
  }

  getCurrentUserToken(){
    this.afAuth.auth.currentUser.getIdToken()
    .then(
      (token: string) => {
        localStorage.setItem('isLoggedIn', token);
        this.authChangeListener.emit();
      }
    )
    localStorage.getItem('isLoggedIn');
  }

  isAuthenticated() {
    return (localStorage.getItem('isLoggedIn')) ? true : false;
  }
  isAuthenticatedObs(): Observable<boolean> {
    return (localStorage.getItem('isLoggedIn')) ? of(true) : of(false);
  }
}
