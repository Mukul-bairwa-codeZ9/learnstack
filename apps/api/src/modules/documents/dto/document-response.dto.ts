import { Expose } from 'class-transformer';
import { DocumentStatus } from '../enums/document-status.enum';

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

export class DocumentSummaryResponseDto {
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
  status: DocumentStatus;

  @Expose()
  publishedAt: Date | null;

  @Expose()
  updatedAt: Date;
}
