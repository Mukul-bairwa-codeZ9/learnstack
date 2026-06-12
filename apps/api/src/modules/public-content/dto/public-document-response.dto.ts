import { SeoMetadataDto } from './seo-metadata.dto';

export class PublicDocumentResponseDto {
  id: string;

  title: string;

  slug: string;

  content: Record<string, any>;

  status: string;

  publishedAt: Date | null;

  seo: SeoMetadataDto;
}
