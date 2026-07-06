import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../access/guards/permissions.guard';
import { DocumentsService } from './documents.service';
import { Permission } from '../access/enums/permission.enum';
import { Permissions } from '../access/decorators/permissions.decorator'; // Fixed import
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CurrentUser as CurrentUserType } from '../access/interfaces/current-user.interface';
import {
  CreateDocumentDto,
  DocumentQueryDto,
  UpdateDocumentDto,
} from './dto/document.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Documents')
@Controller('documents')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}
  @Get()
  @ApiOperation({
    summary: 'Get all documents of user in a workspace',
  })
  @ApiQuery({
    name: 'workspaceId',
    required: false,
    type: String,
    description: 'Filter documents by a specific workspace ID',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search string to filter documents by title',
  })
  @Permissions(Permission.DOCUMENT_VIEW)
  async findAll(
    @CurrentUser() user: CurrentUserType,
    @Query() query: DocumentQueryDto,
  ) {
    return this.documentsService.findAllForUser(user.id, query);
  }

  @Get('public/:slug')
  @ApiOperation({
    summary: 'Get published document by slug value',
  })
  async getPublishedDocument(@Param('slug') slug: string) {
    return this.documentsService.getPublishedDocumentBySlug(slug);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get document details of user by id ',
  })
  @Permissions(Permission.DOCUMENT_VIEW)
  async findOne(@Param('id') id: string, @CurrentUser() user: CurrentUserType) {
    return this.documentsService.findOneForUser(id, user.id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create new document in a workspace',
  })
  @Permissions(Permission.DOCUMENT_CREATE)
  async create(
    @CurrentUser() user: CurrentUserType,
    @Body() dto: CreateDocumentDto,
  ) {
    return this.documentsService.create(user.id, dto);
  }

  @Post(':id/publish')
  @ApiOperation({
    summary: 'Publish document by documentId for a user',
  })
  async publishDocument(
    @Param('id') documentId: string,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.documentsService.publishDocument(documentId, user.id);
  }

  @Post(':id/unpublish')
  @ApiOperation({
    summary: 'Un-Publish document by documentId for a user',
  })
  async unpublishDocument(
    @Param('id') documentId: string,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.documentsService.unpublishDocument(documentId, user.id);
  }
  @Post(':id/archive')
  @ApiOperation({
    summary: 'Archive document by documentId for a user',
  })
  async archiveDocument(
    @Param('id') documentId: string,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.documentsService.archiveDocument(documentId, user.id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update document by documentId for a user',
  })
  @Permissions(Permission.DOCUMENT_UPDATE)
  async update(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserType,
    @Body() dto: UpdateDocumentDto,
  ) {
    return this.documentsService.updateDocument(id, user.id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete document by documentId for a user',
  })
  @Permissions(Permission.DOCUMENT_DELETE)
  async remove(@Param('id') id: string, @CurrentUser() user: CurrentUserType) {
    return this.documentsService.deleteDocument(id, user.id);
  }
}
