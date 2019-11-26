import { Component, OnInit, Input } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.css']
})
export class ContactCardComponent implements OnInit {
  
  @Input() contact;
  
  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit() {
    // console.log(this.contact);
  }

  deleteContact() {
    // console.log(this.contact.id);
    if(confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(this.contact.id).then( res => {
        // console.log(res);
      });
    }
  }

  editContact() {

  }
}
