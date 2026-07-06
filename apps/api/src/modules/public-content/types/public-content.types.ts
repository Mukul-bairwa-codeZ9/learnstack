export interface PublicDocumentRow {
  _id: { toString(): string } | string;
  title: string;
  slug: string;
  content?: Record<string, any>;
  status: string;
  excerpt?: string;
  category?: string;
  publishedAt?: Date | null;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}
