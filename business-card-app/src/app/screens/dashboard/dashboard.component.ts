import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private contacts = [];
  listContacts = () => { 
    return this.contacts.filter(x => x.payload.doc.data().rawData.search(this.searchTerm) > - 1);
  }
  searchTerm: string = '';

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.getContacts();
  }

  searchContacts(searchTerm) {
    this.searchTerm = searchTerm;
  }

  getContacts = () =>
    this.contactService.getContacts().subscribe( res => (this.contacts = res));
}
