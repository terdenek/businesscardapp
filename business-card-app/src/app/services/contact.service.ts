import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Contact } from '../models/contact';

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

  getContactById(contactId) {
    return this.firestore.collection('contacts').doc(contactId).get();
  }

  updateContact(contact: Contact) {
    return this.firestore.collection('contacts').doc(contact.id).update(
      {
        first_name: contact.firstName ? contact.firstName : '',
        last_name: contact.lastName ? contact.lastName : '',
        company: contact.companyName ? contact.companyName : '',
        title: contact.role ? contact.role : '',
        email: contact.email ? contact.email : '',
        phone: contact.phone ? contact.phone : '',
        imageURL: contact.imageBase64,
        rawData: contact.rawData
      }
    );
  }

  createContact(contact: Contact) {
    return this.firestore
          .collection("contacts")
          .add({
            first_name: contact.firstName ? contact.firstName : '',
            last_name: contact.lastName ? contact.lastName : '',
            company: contact.companyName ? contact.companyName : '',
            title: contact.role ? contact.role : '',
            email: contact.email ? contact.email : '',
            phone: contact.phone ? contact.phone : '',
            imageURL: contact.imageBase64,
            rawData: contact.rawData
          });
  }

  deleteContact(contactId: string) {
    return this.firestore
      .collection("contacts")
      .doc(contactId).delete();
  }
}
