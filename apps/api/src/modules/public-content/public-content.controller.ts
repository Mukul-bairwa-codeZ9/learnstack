import { Controller, Get, Param, Query } from '@nestjs/common';

import { PublicContentService } from './public-content.service';
import { PublicDocumentResponseDto } from './dto/public-document-response.dto';
import { PublicDocumentsQueryDto, PublicDocumentsResponseDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Public Content')
@Controller('public-content')
export class PublicContentController {
  constructor(private readonly publicContentService: PublicContentService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all public content based on filters',
  })
  async findAll(
    @Query() query: PublicDocumentsQueryDto,
  ): Promise<PublicDocumentsResponseDto> {
    return this.publicContentService.findAll(query);
  }

  @Get(':slug')
  @ApiOperation({
    summary: 'Get public content by slug value',
  })
  async findBySlug(
    @Param('slug') slug: string,
  ): Promise<PublicDocumentResponseDto> {
    return this.publicContentService.findBySlug(slug);
  }
}
