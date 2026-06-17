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

export interface PublishedDocumentListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: Date | null;
  updatedAt: Date | null;
}

export interface PublishedDocumentsAggregateResult {
  items: PublishedDocumentListItem[];
  totalCount: Array<{
    count: number;
  }>;
}

export interface PublishedDocumentsResult {
  items: PublishedDocumentListItem[];
  total: number;
}
