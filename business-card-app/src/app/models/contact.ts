import { Attachment } from './attachment';

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
}