import { plainToInstance } from 'class-transformer';
import { DocumentEntity } from '../schemas/document.schema';
import {
  DocumentResponseDto,
  DocumentSummaryResponseDto,
} from '../dto/document-response.dto';
export class DocumentMapper {
  // Used for Detail / Mutations (POST, PATCH, GET /:id)
  static toResponse(this: void, document: DocumentEntity): DocumentResponseDto {
    return plainToInstance(
      DocumentResponseDto,
      {
        id: document._id.toString(),
        title: document.title,
        slug: document.slug,
        excerpt: document.excerpt,
        category: document.category,
        content: document.content,
        status: document.status,
        seo: document.seo,
        publishedAt: document.publishedAt,
        archivedAt: document.archivedAt,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
      },
      { excludeExtraneousValues: true },
    );
  }

  static toResponseList(
    this: void,
    documents: DocumentEntity[],
  ): DocumentResponseDto[] {
    return documents.map(DocumentMapper.toResponse);
  }

  //  Used for Lists / Pagination / Aggregations (GET /documents)
  static toSummary(
    this: void,
    document: DocumentEntity,
  ): DocumentSummaryResponseDto {
    return plainToInstance(
      DocumentSummaryResponseDto,
      {
        id: document._id.toString(),
        title: document.title,
        slug: document.slug,
        excerpt: document.excerpt,
        category: document.category,
        status: document.status,
        publishedAt: document.publishedAt,
        updatedAt: document.updatedAt,
      },
      { excludeExtraneousValues: true },
    );
  }

  static toSummaryList(
    this: void,
    documents: DocumentEntity[],
  ): DocumentSummaryResponseDto[] {
    return documents.map(DocumentMapper.toSummary);
  }
}
