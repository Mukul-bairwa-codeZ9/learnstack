import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import slugify from 'slugify';

import { DocumentsRepository } from './repositories/documents.repository';
import { WorkspaceRepository } from '../workspaces/repositories/workspace.repository';

import { CreateDocumentDto, UpdateDocumentDto } from './dto/document.dto';
import { WorkspaceDocument } from '../workspaces/schemas/workspace.schema';
import { CreateDocumentData } from './types/documents.types';
import { DocumentEntity } from './schemas/document.schema';
import { DocumentStatus } from './enums/document-status.enum';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly documentsRepository: DocumentsRepository,
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  async create(userId: string, dto: CreateDocumentDto) {
    const workspace = await this.workspaceRepository.findById(dto.workspaceId);

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    // workspace ownership
    this.assertWorkspaceOwnership(workspace, userId);

    const slug = await this.generateUniqueSlug(dto.title, dto.workspaceId);

    const documentData: CreateDocumentData = {
      title: dto.title,
      workspaceId: dto.workspaceId,
      content: dto.content,
      slug,
      createdBy: userId,
    };

    return this.documentsRepository.create(documentData);
  }

  async findAllForUser(userId: string, workspaceId?: string) {
    if (workspaceId) {
      const workspace = await this.workspaceRepository.findById(workspaceId);

      if (!workspace) {
        throw new NotFoundException('Workspace not found');
      }

      this.assertWorkspaceOwnership(workspace, userId);

      return this.documentsRepository.find({
        workspaceId,
      });
    }

    const workspaces = await this.workspaceRepository.findByOwner(userId);

    const workspaceIds = workspaces.map((workspace) => workspace._id);

    return this.documentsRepository.find({
      workspaceId: {
        $in: workspaceIds,
      },
    });
  }

  async findOneForUser(documentId: string, userId: string) {
    const document = await this.documentsRepository.findById(documentId);

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    const workspace = await this.workspaceRepository.findById(
      document.workspaceId.toString(),
    );

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    this.assertWorkspaceOwnership(workspace, userId);

    return document;
  }

  async updateDocument(
    documentId: string,
    userId: string,
    dto: UpdateDocumentDto,
  ) {
    const document = await this.documentsRepository.findById(documentId);

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    const workspace = await this.workspaceRepository.findById(
      document.workspaceId.toString(),
    );

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    this.assertWorkspaceOwnership(workspace, userId);

    const updateData = {
      title: dto.title,
      content: dto.content,
    };

    return this.documentsRepository.update(documentId, updateData);
  }

  async deleteDocument(documentId: string, userId: string) {
    const document = await this.documentsRepository.findById(documentId);

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    const workspace = await this.workspaceRepository.findById(
      document.workspaceId.toString(),
    );

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    this.assertWorkspaceOwnership(workspace, userId);

    await this.documentsRepository.delete(documentId);

    return {
      success: true,
    };
  }

  // ==========================================
  // Publishing Workflow Lifecycle Methods
  // ==========================================

  async publishDocument(documentId: string, userId: string) {
    const document = await this.getDocumentWithOwnershipCheck(
      documentId,
      userId,
    );

    if (document.status === DocumentStatus.PUBLISHED) {
      return document;
    }

    this.validatePublishableDocument(document);

    return this.documentsRepository.publish(documentId, new Date());
  }

  async unpublishDocument(documentId: string, userId: string) {
    const document = await this.getDocumentWithOwnershipCheck(
      documentId,
      userId,
    );

    if (document.status === DocumentStatus.DRAFT) {
      return document;
    }

    return this.documentsRepository.unpublish(documentId);
  }

  async archiveDocument(documentId: string, userId: string) {
    const document = await this.getDocumentWithOwnershipCheck(
      documentId,
      userId,
    );

    if (document.status === DocumentStatus.DRAFT) {
      throw new BadRequestException('Draft documents cannot be archived');
    }

    if (document.status === DocumentStatus.ARCHIVED) {
      return document;
    }

    return this.documentsRepository.archive(documentId, new Date());
  }

  async getPublishedDocumentBySlug(slug: string) {
    const document = await this.documentsRepository.findBySlug(slug);

    if (!document) {
      throw new NotFoundException('Published document not found');
    }

    return document;
  }

  // ==========================================
  // Private Domain Helper Methods
  // ==========================================

  private async getDocumentWithOwnershipCheck(
    documentId: string,
    userId: string,
  ): Promise<DocumentEntity> {
    const document = await this.documentsRepository.findById(documentId);

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    const workspace = await this.workspaceRepository.findById(
      document.workspaceId.toString(),
    );

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    this.assertWorkspaceOwnership(workspace, userId);

    return document;
  }

  private validatePublishableDocument(document: DocumentEntity): void {
    if (!document.title?.trim()) {
      throw new BadRequestException(
        'Document title is required for publishing',
      );
    }
    if (!document.content || Object.keys(document.content).length === 0) {
      throw new BadRequestException(
        'Document content cannot be empty when publishing',
      );
    }
  }

  private async generateUniqueSlug(
    title: string,
    workspaceId: string,
  ): Promise<string> {
    const baseSlug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    let slug = baseSlug;

    let counter = 1;

    while (
      await this.documentsRepository.findOne({
        workspaceId,
        slug,
      })
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }

  private assertWorkspaceOwnership(
    workspace: WorkspaceDocument,
    userId: string,
  ): void {
    if (workspace.ownerId.toString() !== userId) {
      throw new ForbiddenException('You do not have access to this workspace');
    }
  }
}
