import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import slugify from 'slugify';

import { WorkspaceRepository } from './repositories/workspace.repository';

import {
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
} from './dto/workspace.dto';

import { Workspace } from './schemas/workspace.schema';

@Injectable()
export class WorkspacesService {
  constructor(
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  async create(
    ownerId: string,
    dto: CreateWorkspaceDto,
  ) {
    const slug =
      await this.generateUniqueSlug(dto.name);

    return this.workspaceRepository.create({
      ...dto,
      slug,
      ownerId 
    });
  }

  async findAllForUser(
    userId: string,
  ) {
    return this.workspaceRepository.findByOwner(
      userId,
    );
  }

  async findOneForUser(
    workspaceId: string,
    userId: string,
  ) {
    const workspace =
      await this.workspaceRepository.findById(
        workspaceId,
      );

    if (!workspace) {
      throw new NotFoundException(
        'Workspace not found',
      );
    }

    this.assertOwnership(
      workspace,
      userId,
    );

    return workspace;
  }

  async updateWorkspace(
    workspaceId: string,
    userId: string,
    dto: UpdateWorkspaceDto,
  ) {
    const workspace =
      await this.workspaceRepository.findById(
        workspaceId,
      );

    if (!workspace) {
      throw new NotFoundException(
        'Workspace not found',
      );
    }

    this.assertOwnership(
      workspace,
      userId,
    );

    const updateData = {
      name: dto.name,
      description: dto.description,
      visibility: dto.visibility,
    };

    return this.workspaceRepository.update(
      workspaceId,
      updateData,
    );
  }

  async deleteWorkspace(
    workspaceId: string,
    userId: string,
  ) {
    const workspace =
      await this.workspaceRepository.findById(
        workspaceId,
      );

    if (!workspace) {
      throw new NotFoundException(
        'Workspace not found',
      );
    }

    this.assertOwnership(
      workspace,
      userId,
    );

    await this.workspaceRepository.delete(
      workspaceId,
    );

    return {
      success: true,
    };
  }

  private async generateUniqueSlug(
    name: string,
  ): Promise<string> {
    const baseSlug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    let slug = baseSlug;

    let counter = 1;

    while (
      await this.workspaceRepository.findBySlug(
        slug,
      )
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }

  private assertOwnership(
    workspace: Workspace,
    userId: string,
  ): void {
    if (
      workspace.ownerId.toString() !==
      userId
    ) {
      throw new NotFoundException(
        'Workspace not found',
      );
    }
  }
}