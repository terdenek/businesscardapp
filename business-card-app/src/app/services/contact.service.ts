import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getContacts() {
    return this.firestore
          .collection("contacts").snapshotChanges();
  }

  createContact(data) {
    return new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("contacts")
          .add(data)
          .then(res => {}, err => reject(err));
    });
  }
}
