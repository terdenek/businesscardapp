import { Attachment } from './attachment';
import { RegexLookups } from './regex-lookups.enum';

export class Contact {
    id: string;
    createdDate: Date;
    // informational
    nickname: string;
    firstName: string;
    middleName: string;
    lastName: string;
    role: string;   // probably should be a list to keep track of previous roles
    // contact info
    email: string;
    phone: string;
    fax: string;

    rawData: string;
    
    companyName: string;
    companyWebsite: string;
    companyAddress: string;

    attachments: Attachment[];

    tryParseOCR(fullOcr) {
        // save rawdata first
        this.rawData = fullOcr;
        // load all fields
        const splitOcr = fullOcr.split('\n');
        splitOcr.forEach(x => {
            console.log(x);
            if(x.match(RegexLookups.email)) {
                console.log('email');
                this.email = x;
                console.log(this.email);
            } else if (x.match(RegexLookups.phone)) {
                console.log('phone');
                this.phone = x;
            } else if (x.match(RegexLookups.fullName)) {
                // assume it's title, if we found a "name" 2nd time
                if(this.firstName) { 
                    // assume it's company, if we found a "name" 3rd time
                    if(this.role) {
                        this.companyName = x;
                    } else {
                        this.role = x;
                    }
                } else {
                    const nameSplit = x.split(" ");
                    console.log(nameSplit);
                    switch (nameSplit.length) {
                        case 1:
                            console.log('1 name');
                            this.firstName = x;
                            break;
                        case 2:
                            console.log('2 name');
                            this.firstName = nameSplit[0];
                            this.lastName = nameSplit[1];
                            break;
                        case 3:
                            console.log('3 name');
                            this.firstName = nameSplit[0];
                            this.middleName = nameSplit[1];
                            this.lastName = nameSplit[2];
                            break;
                        default:
                            break;
                    }
                }
            }
        });

    }
}