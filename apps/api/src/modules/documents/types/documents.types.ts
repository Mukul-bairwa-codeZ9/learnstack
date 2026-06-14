import { DocumentStatus } from '../enums/document-status.enum';

export interface CreateDocumentData {
  title: string;
  slug: string;
  workspaceId: string;
  createdBy: string;
  content?: Record<string, any>;
  status?: DocumentStatus;
  excerpt?: string;
  category?: string;
}

export interface DocumentFilters {
  workspaceId?: string;
  createdBy?: string;
  status?: DocumentStatus;
  category?: string;
}
