import { plainToInstance } from 'class-transformer';
import {
  PublicDocumentResponseDto,
  PublicDocumentSummaryDto,
} from '../dto/public-content-response.dto';
import { PublicDocumentRow } from '../types/public-content.types';

export class PublicDocumentMapper {
  /**
   * Maps a single record to the public detail DTO.
   */
  static toResponse(
    this: void,
    document: PublicDocumentRow,
  ): PublicDocumentResponseDto {
    return plainToInstance(
      PublicDocumentResponseDto,
      {
        // Safe check for detail mapping
        id: document?._id?.toString() ?? '',
        title: document.title,
        slug: document.slug,
        content: document.content,
        // status: document.status,
        publishedAt: document.publishedAt ?? null,
        seo: {
          title: document.seo?.title ?? '',
          description: document.seo?.description ?? '',
          keywords: document.seo?.keywords ?? [],
        },
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  /**
   * Maps a single record to the lightweight list summary DTO.
   */
  static toSummary(
    this: void,
    document: PublicDocumentRow,
  ): PublicDocumentSummaryDto {
    return plainToInstance(
      PublicDocumentSummaryDto,
      {
        // FIX: Added optional chaining and safe fallback check here too!
        id: document?._id?.toString() ?? '',
        title: document.title,
        slug: document.slug,
        excerpt: document.excerpt ?? '',
        category: document.category ?? '',
        publishedAt: document.publishedAt ?? null,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  /**
   * Maps an array of plain database records safely for lists.
   */
  static toSummaryList(
    this: void,
    documents: PublicDocumentRow[],
  ): PublicDocumentSummaryDto[] {
    return documents.map(PublicDocumentMapper.toSummary);
  }
}
