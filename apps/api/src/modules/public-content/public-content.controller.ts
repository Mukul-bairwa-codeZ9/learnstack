import { Controller, Get, Param } from '@nestjs/common';

import { PublicContentService } from './public-content.service';
import { PublicDocumentResponseDto } from './dto/public-document-response.dto';

@Controller('public-content')
export class PublicContentController {
  constructor(private readonly publicContentService: PublicContentService) {}

  @Get(':slug')
  async findBySlug(
    @Param('slug') slug: string,
  ): Promise<PublicDocumentResponseDto> {
    return this.publicContentService.findBySlug(slug);
  }
}
