import { DocumentsRepository } from './../documents/repositories/documents.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicDocumentResponseDto } from './dto';
import { DocumentStatus } from '../documents/enums/document-status.enum';

@Injectable()
export class PublicContentService {
  constructor(private readonly documentsRepository: DocumentsRepository) {}

  async findBySlug(slug: string): Promise<PublicDocumentResponseDto> {
    const document = await this.documentsRepository.findOne({
      slug,
      status: DocumentStatus.PUBLISHED,
    });

    if (!document) {
      throw new NotFoundException('Published document not found');
    }

    return {
      id: document._id.toString(),
      title: document.title,
      slug: document.slug,
      content: document.content,
      status: document.status,
      publishedAt: document.publishedAt ?? null,

      seo: {
        title: document.seo?.title ?? '',
        description: document.seo?.description ?? '',
        keywords: document.seo?.keywords ?? [],
      },
    };
  }
}
