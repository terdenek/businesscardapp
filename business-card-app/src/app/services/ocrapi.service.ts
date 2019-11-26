import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OcrApiService {
  private API_URL = 'https://vision.googleapis.com/v1/images:annotate?key=';
  constructor(
    private httpClient: HttpClient
  ) { }
  
  getCardDetails(base64Image: String) {
    const parsedImage = base64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    return this.httpClient.post(this.API_URL + environment.cloudVision,
      {
        'requests': [
          {
            'image' : {
              'content' : parsedImage
            },
            'features': {
              'type': 'TEXT_DETECTION'
            }
          }
        ]
      }
    );
  }
}


/*
The cloud vision api is working.
Here is the updated api key ‘AIzaSyBby6pLqEOiul44__X2MGZsNXF9SzzlQEE’
make sure to include the key as part of the url
`https://vision.googleapis.com/v1/images:annotate?key=${environment.cloudVision}`
additionally, google cloud requires that the header for a base64 image be removed,
which can be done using the following line of code.  so make sure to parse the header before
sending the post request to google cloud
const parsedImage = this.mybase64Image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ‘’);
*/