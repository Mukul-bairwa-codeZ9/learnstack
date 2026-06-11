export enum DocumentStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export interface Document {
  _id: string;
  title: string;
  slug: string;
  content?: Record<string, any>;
  workspaceId: string;
  createdBy: string;
  status: DocumentStatus;

  publishedAt?: string | null;
  archivedAt?: string | null;
  
  createdAt: string;
  updatedAt: string;
}

export interface CreateDocumentDto {
  title: string;
  workspaceId: string;
  content?: Record<string, any>;
}

export interface UpdateDocumentDto {
  title?: string;
  content?: Record<string, any>;
}



export interface PublishDocumentResponse {
  _id: string;
  slug: string;
  status: DocumentStatus;
  publishedAt: string;
}

export interface DocumentStatusResponse {
  _id: string;
  status: DocumentStatus;
}