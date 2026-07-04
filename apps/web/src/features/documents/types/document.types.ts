export enum DocumentStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export interface Document {
  _id: string;
  title: string;
  slug: string;
  content?: Record<string, unknown>;
  workspaceId: string;
  createdBy: string;
  status: DocumentStatus;
  category?: string;
  excerpt?: string;

  publishedAt?: string | null;
  archivedAt?: string | null;

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
  _id: string;
  slug: string;
  status: DocumentStatus;
  publishedAt: string;
}

export interface DocumentStatusResponse {
  _id: string;
  status: DocumentStatus;
}

export interface DocumentFilters {
  workspaceId?: string;
  search?: string;
}


export type SettingsTab = "general" | "publishing" | "seo" | "danger";
export type DialogAction = "archive" | "delete" | null;