import type { EditorContent } from "@/features/editor/types";

export interface SeoMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface PublicDocument {
  id: string;
  title: string;
  slug: string;
  content: EditorContent;
  publishedAt: string | null;
  seo: SeoMetadata;
}


export interface PublicDocumentSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string | null;
  updatedAt: string | null;
}

export interface PublicDocumentsMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PublicDocumentsResponse {
  items: PublicDocumentSummary[];
  meta: PublicDocumentsMeta;
}

export interface PublicDocumentsQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sort?: "newest" | "oldest" | "updated";
}
