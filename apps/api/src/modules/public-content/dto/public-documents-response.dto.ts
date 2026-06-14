export class PublicDocumentSummaryDto {
  id: string;

  title: string;

  slug: string;

  excerpt: string;

  category: string;

  publishedAt: Date | null;
}

export class PublicDocumentsResponseDto {
  items: PublicDocumentSummaryDto[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}