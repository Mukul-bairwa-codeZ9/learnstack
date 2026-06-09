import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Document, DocumentSchema } from './schemas/document.schema';
import { DocumentsRepository } from './repositories/documents.repository';
import { WorkspacesModule } from '../workspaces/workspaces.module';
import { AccessModule } from '../access/access.module';
import { WorkspaceRepository } from '../workspaces/repositories/workspace.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Document.name,
        schema: DocumentSchema,
      },
    ]),
    WorkspacesModule,
    AccessModule,
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService,DocumentsRepository,WorkspaceRepository],
  exports: [DocumentsService,DocumentsRepository],
})
export class DocumentsModule {}
