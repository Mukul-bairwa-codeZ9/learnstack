import { Module } from '@nestjs/common';
import { PublicContentController } from './public-content.controller';
import { PublicContentService } from './public-content.service';
import { DocumentsModule } from '../documents/documents.module';

@Module({
   imports: [DocumentsModule],
  controllers: [PublicContentController],
  providers: [PublicContentService]
})
export class PublicContentModule {}
