import { Controller, Get, Param, Query } from '@nestjs/common';

import { PublicContentService } from './public-content.service';
import { PublicDocumentResponseDto } from './dto/public-document-response.dto';
import { PublicDocumentsQueryDto, PublicDocumentsResponseDto } from './dto';

@Controller('public-content')
export class PublicContentController {
  constructor(private readonly publicContentService: PublicContentService) {}

  @Get()
  async findAll(
    @Query() query: PublicDocumentsQueryDto,
  ): Promise<PublicDocumentsResponseDto> {
    return this.publicContentService.findAll(query);
  }

  @Get(':slug')
  async findBySlug(
    @Param('slug') slug: string,
  ): Promise<PublicDocumentResponseDto> {
    return this.publicContentService.findBySlug(slug);
  }
}
