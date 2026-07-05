import { plainToInstance } from 'class-transformer';

import { DocumentEntity } from '../schemas/document.schema';
import { DocumentResponseDto } from '../dto/document-response.dto';

export class DocumentMapper {
  static toResponse(
    document: DocumentEntity,
  ): DocumentResponseDto {
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
        publishedAt: document.publishedAt,

        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  static toResponseList(
    documents: DocumentEntity[],
  ): DocumentResponseDto[] {
    return documents.map(DocumentMapper.toResponse);
  }
}