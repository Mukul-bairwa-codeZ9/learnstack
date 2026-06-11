import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../access/guards/permissions.guard';
import { DocumentsService } from './documents.service';
import { Permission } from '../access/enums/permission.enum';
import { Permissions } from '../access/decorators/permissions.decorator'; // Fixed import
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CurrentUser as CurrentUserType } from '../access/interfaces/current-user.interface';
import { CreateDocumentDto, UpdateDocumentDto } from './dto/document.dto';

@Controller('documents')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}
  @Get()
  @Permissions(Permission.DOCUMENT_VIEW)
  async findAll(@CurrentUser() user: CurrentUserType) {
    // Assuming you want to fetch documents belonging to the user's context or workspace
    return this.documentsService.findAllForUser(user.id);
  }

  @Get('public/:slug')
  async getPublishedDocument(@Param('slug') slug: string) {
    return this.documentsService.getPublishedDocumentBySlug(slug);
  }

  @Get(':id')
  @Permissions(Permission.DOCUMENT_VIEW)
  async findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserType) {
    return this.documentsService.findOneForUser(id, user.id);
  }

  @Post()
  @Permissions(Permission.DOCUMENT_CREATE)
  async create(
    @CurrentUser() user: CurrentUserType,
    @Body() dto: CreateDocumentDto,
  ) {
    return this.documentsService.create(user.id, dto);
  }

  @Post(':id/publish')
  async publishDocument(
    @Param('id') documentId: string,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.documentsService.publishDocument(documentId, user.id);
  }

  @Post(':id/unpublish')
  async unpublishDocument(
    @Param('id') documentId: string,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.documentsService.unpublishDocument(documentId, user.id);
  }
  @Post(':id/archive')
  async archiveDocument(
    @Param('id') documentId: string,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.documentsService.archiveDocument(documentId, user.id);
  }

  @Patch(':id')
  @Permissions(Permission.DOCUMENT_UPDATE)
  async update(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserType,
    @Body() dto: UpdateDocumentDto,
  ) {
    return this.documentsService.updateDocument(id, user.id, dto);
  }

  @Delete(':id')
  @Permissions(Permission.DOCUMENT_DELETE)
  async remove(@Param('id') id: string, @CurrentUser() user: CurrentUserType) {
    return this.documentsService.deleteDocument(id, user.id);
  }
}
