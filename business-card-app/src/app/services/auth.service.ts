import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth){}

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
    this.afAuth.auth.signOut();
    localStorage.removeItem('isLoggedIn');
  }

  getCurrentUserToken(){
    this.afAuth.auth.currentUser.getIdToken()
    .then(
      (token: string) => {
        localStorage.setItem('isLoggedIn', token);
      }
    )
    localStorage.getItem('isLoggedIn');
  }

  isAuthenticated(){
    return (localStorage.getItem('isLoggedIn')) ? true : false;
  }
}
