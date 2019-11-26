import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';
import { WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';
import { OcrApiService } from 'src/app/services/ocrapi.service';
import domtoimage from 'dom-to-image';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  contact: Contact = new Contact();
  showWebcam: Boolean = false;

  webcamImage: WebcamImage = null;
  fileImageURL: any = null;
  private trigger: Subject<void> = new Subject<void>();

  constructor(
    private contactService: ContactService,
    private ocrApiService: OcrApiService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.contactService.createContact(this.contact).then( res => {
      console.log("got response");
      console.log(res);
      this.router.navigateByUrl('/');
    });
  }
  // MARK: Webcam handler
  toggleWebcam(status) {
    this.showWebcam = status;
  }
  triggerSnapshot(): void {
    this.trigger.next();
  }
  handleImageCapture(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.showWebcam = false;
    this.fileImageURL = null;
    this.onImageUploaded();
  }
  get webcamTriggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  
  // MARK: File upload section
  uploadFile() {
    let inputDom: HTMLElement = document.getElementById('file-upload') as HTMLElement;
    inputDom.click();
  }
  onFileChange(event) {
    let files = event.target.files;
    if(files.length > 0) {
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.webcamImage = null;
        this.fileImageURL = reader.result;
      }
    }
  }
  // MARK: Api handler for image
  onImageUploaded() {
    const imgDom = document.getElementById('contact-image');
    if(imgDom) {
      const base64String = imgDom.attributes['src'].value;
      // call api
      this.ocrApiService.getCardDetails(base64String)
      .subscribe(
        (res:any) => {
          console.log(res);
          if(res.responses[0]) {
            // since this was for a test, went with the assumption that these are top down business cards
            this.contact = new Contact();
            this.contact.imageBase64 = base64String;
            this.contact.tryParseOCR(res.responses[0].fullTextAnnotation.text);
          }
        },
        err => {
          console.log("error: ${err}");
        }
      );
    }
  }
}
