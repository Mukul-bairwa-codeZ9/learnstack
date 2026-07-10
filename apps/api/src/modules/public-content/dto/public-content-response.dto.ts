import { Expose, Type } from 'class-transformer';
import { PaginationMetaDto } from '../../../common/dto'; // Adjust relative path as needed

// Sub-DTO: Nested SEO Schema
export class SeoMetadataDto {
  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  keywords!: string[];
}

// DTO 1: Detail response (GET /public-content/:slug)
export class PublicDocumentResponseDto {
  @Expose()
  id!: string;

  @Expose()
  title!: string;

  @Expose()
  slug!: string;

  @Expose()
  content!: Record<string, any>;

  // @Expose()
  // status!: string;

  @Expose()
  publishedAt!: Date | null;

  @Expose()
  @Type(() => SeoMetadataDto)
  seo!: SeoMetadataDto;
}

// DTO 2: Cleaned item summary used inside lists
export class PublicDocumentSummaryDto {
  @Expose()
  id!: string;

  @Expose()
  title!: string;

  @Expose()
  slug!: string;

  @Expose()
  excerpt!: string;

  @Expose()
  category!: string;

  @Expose()
  publishedAt!: Date | null;
}

// DTO 3: Paginated Collection response (GET /public-content)
export class PublicDocumentsResponseDto {
  @Expose()
  @Type(() => PublicDocumentSummaryDto)
  items!: PublicDocumentSummaryDto[];

  @Expose()
  meta!: PaginationMetaDto;
}
