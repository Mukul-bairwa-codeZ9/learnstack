import { DocumentStatus } from '../enums/document-status.enum';

export class PublishDocumentResponseDto {
  id: string;
  status: DocumentStatus;
  slug: string;
  publishedAt: Date;
}

export class DocumentStatusResponseDto {
  id: string;
  status: DocumentStatus;
}