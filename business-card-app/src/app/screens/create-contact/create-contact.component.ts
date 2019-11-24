import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';
import { WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  contact: Contact = new Contact();
  showWebcam: Boolean = false;

  webcamImage: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit() {
  }

  onSubmit(e) {
    e.preventDefault();
  }

  toggleWebcam(status) {
    console.log("toggleWebcam", status);
    this.showWebcam = status;
  }

  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleImageCapture(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
    this.showWebcam = false;
  }
  
  get webcamTriggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
}
