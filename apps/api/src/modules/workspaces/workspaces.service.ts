import { Injectable, NotFoundException } from '@nestjs/common';

import { Types } from 'mongoose';
import slugify from 'slugify';

import { WorkspaceRepository } from './repositories/workspace.repository';

import {
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
  WorkspaceQueryDto,
  WorkspaceResponseDto,
  WorkspaceSummaryResponseDto,
} from './dto';

import { Workspace } from './schemas/workspace.schema';
import { WorkspaceMapper } from './mapper/workspace.mapper';
import { PaginatedResponseDto } from 'src/common/dto';
import { WorkspaceVisibility } from './enums/workspace.enums';

@Injectable()
export class WorkspacesService {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}

  async create(
    ownerId: string,
    dto: CreateWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    const slug = await this.generateUniqueSlug(dto.name);

    const workspace = await this.workspaceRepository.create({
      ...dto,
      slug,
      ownerId,
    });

    return WorkspaceMapper.toResponse(workspace);
  }

  async findAllForUser(
    userId: string,
    query: WorkspaceQueryDto,
  ): Promise<PaginatedResponseDto<WorkspaceSummaryResponseDto>> {
    const { page, limit, search, sortBy, sortOrder } = query;

    const filter: Record<string, unknown> = {
      ownerId: new Types.ObjectId(userId),
    };

    if (search?.trim()) {
      filter.search = search.trim();
    }

    const { items, total } = await this.workspaceRepository.findPaginated({
      filter,
      page,
      limit,
      sortBy,
      sortOrder,
    });

    return {
      items: WorkspaceMapper.toSummaryList(items),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      },
    };
  }

  async findOneForUser(
    workspaceId: string,
    userId: string,
  ): Promise<WorkspaceResponseDto> {
    const workspace = await this.workspaceRepository.findById(workspaceId);

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    this.assertOwnership(workspace, userId);

    return WorkspaceMapper.toResponse(workspace);
  }

  async updateWorkspace(
    workspaceId: string,
    userId: string,
    dto: UpdateWorkspaceDto,
  ): Promise<WorkspaceResponseDto> {
    const workspace = await this.workspaceRepository.findById(workspaceId);

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    this.assertOwnership(workspace, userId);

    const updateData: {
      name?: string;
      slug?: string;
      description?: string;
      visibility?: WorkspaceVisibility;
    } = {
      name: dto.name,
      description: dto.description,
      visibility: dto.visibility,
    };

    if (dto.name && dto.name !== workspace.name) {
      updateData.slug = await this.generateUniqueSlug(dto.name);
    }

    const updated = await this.workspaceRepository.update(
      workspaceId,
      updateData,
    );

    if (!updated) {
      throw new NotFoundException('Workspace could not be updated');
    }

    return WorkspaceMapper.toResponse(updated);
  }

  async deleteWorkspace(
    workspaceId: string,
    userId: string,
  ): Promise<{ deleted: boolean }> {
    const workspace = await this.workspaceRepository.findById(workspaceId);

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    this.assertOwnership(workspace, userId);

    await this.workspaceRepository.delete(workspaceId);

    return {
      deleted: true,
    };
  }

  private async generateUniqueSlug(name: string): Promise<string> {
    const baseSlug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    let slug = baseSlug;

    let counter = 1;

    while (await this.workspaceRepository.findBySlug(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }

  private assertOwnership(workspace: Workspace, userId: string): void {
    if (workspace.ownerId.toString() !== userId) {
      throw new NotFoundException('Workspace not found');
    }
  }
}
