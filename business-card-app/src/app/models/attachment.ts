import { AttachmentType } from './attachment-type.enum';

export class Attachment {
    id: string;
    attachmentType: AttachmentType;
    attachmentUrl: string;
    createdDate: Date;
}
