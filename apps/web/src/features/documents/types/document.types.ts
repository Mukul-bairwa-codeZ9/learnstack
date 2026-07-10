export enum DocumentStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export interface Document {
  id: string;

  title: string;
  slug: string;

  content: Record<string, unknown>;

  status: DocumentStatus;

  category: string;
  excerpt: string;

  publishedAt: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface CreateDocumentDto {
  title: string;
  workspaceId: string;
  content?: Record<string, unknown>;
  category?: string;
  excerpt?: string;
}

export interface UpdateDocumentDto {
  title?: string;
  content?: Record<string, unknown>;

  category?: string;
  excerpt?: string;
}

export interface PublishDocumentResponse {
  id: string;
  slug: string;
  status: DocumentStatus;
  publishedAt: string | null;
}

export interface DocumentStatusResponse {
  id: string;
  status: DocumentStatus;
}

export interface DocumentFilters {
  workspaceId?: string;
  search?: string;

  page?: number;
  limit?: number;

  sortBy?: "title" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
}

export interface DocumentSummary {
  id: string;

  title: string;
  slug: string;

  excerpt: string;
  category: string;

  status: DocumentStatus;

  publishedAt: string | null;

  createdAt: string;
  updatedAt: string;
}

export type SettingsTab = "general" | "publishing" | "seo" | "danger";
export type DialogAction = "archive" | "delete" | null;
