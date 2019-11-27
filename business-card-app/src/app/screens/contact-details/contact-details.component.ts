import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/contact';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {

  contact: Contact = new Contact();
  isLoading: Boolean = true;
  private routeSub: Subscription;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      const id = params['id'];
      if(id) {
        this.contactService.getContactById(id).subscribe(
          res => {
            var data:any = res.data();
            this.contact.id = res.id;
            this.contact.firstName = data.first_name;
            this.contact.lastName = data.last_name;
            this.contact.companyName = data.company;
            this.contact.phone = data.phone;
            this.contact.role = data.title;
            this.contact.rawData = data.rawData;
            this.contact.imageBase64 = data.imageURL;
            console.log(this.contact);
            this.isLoading = false;
          }
        );
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onSubmit() {
    this.contactService.updateContact(this.contact).then( res => {
      // success
      this.router.navigateByUrl('/');
    }).catch(err => {
      console.log(err);
    });
  }
}
