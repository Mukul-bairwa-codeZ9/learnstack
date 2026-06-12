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