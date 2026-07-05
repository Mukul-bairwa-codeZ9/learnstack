import { DocumentsRepository } from './../documents/repositories/documents.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentStatus } from '../documents/enums/document-status.enum';

import {
  PublicDocumentResponseDto,
  PublicDocumentsQueryDto,
  PublicDocumentsResponseDto,
} from './dto';
import { PublicDocumentMapper } from './mapper/public-content.mapper';
import { PublicDocumentRow } from './types/public-content.types';

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

    return PublicDocumentMapper.toResponse(document);
  }
  async findAll(
    query: PublicDocumentsQueryDto,
  ): Promise<PublicDocumentsResponseDto> {
    const page = Number(query.page);
    const limit = Number(query.limit);

    const { items, total } =
      await this.documentsRepository.findPublishedDocuments(query);
    const totalPages = Math.ceil(total / limit);

    const mappedItems = PublicDocumentMapper.toSummaryList(
      items as unknown as PublicDocumentRow[],
    );

    return {
      items: mappedItems,
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      },
    };
  }
}
