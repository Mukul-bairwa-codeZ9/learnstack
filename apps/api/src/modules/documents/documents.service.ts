import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import slugify from 'slugify';

import { DocumentsRepository } from './repositories/documents.repository';
import { WorkspaceRepository } from '../workspaces/repositories/workspace.repository';

import { CreateDocumentDto, UpdateDocumentDto } from './dto/document.dto';
import { WorkspaceDocument } from '../workspaces/schemas/workspace.schema';
import { CreateDocumentData } from './types/documents.types';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly documentsRepository: DocumentsRepository,
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  async create(userId: string, dto: CreateDocumentDto) {
    const workspace = await this.workspaceRepository.findById(dto.workspaceId);

    if (!workspace) {
      throw new ForbiddenException(
  'You do not have access to this workspace',
);
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
    console.log(workspace,"tset")
    if (workspace.ownerId.toString() !== userId) {
      throw new NotFoundException('Workspace not found');
    }
  }
}
