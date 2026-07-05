import { Expose } from "class-transformer";

export class DocumentResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  slug: string;

  @Expose()
  excerpt: string;

  @Expose()
  category: string;

  @Expose()
  content: Record<string, unknown>;

  @Expose()
  status: string;

  @Expose()
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };

  @Expose()
  publishedAt: Date | null;

  @Expose()
  archivedAt: Date | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
