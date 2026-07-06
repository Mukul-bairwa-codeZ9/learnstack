import { plainToInstance } from 'class-transformer';

import { WorkspaceDocument } from '../schemas/workspace.schema';

import { WorkspaceResponseDto, WorkspaceSummaryResponseDto } from '../dto';

export class WorkspaceMapper {
  static toResponse(
    this: void,
    workspace: WorkspaceDocument,
  ): WorkspaceResponseDto {
    return plainToInstance(
      WorkspaceResponseDto,
      {
        id: workspace._id.toString(),

        name: workspace.name,
        slug: workspace.slug,
        description: workspace.description,
        visibility: workspace.visibility,

        createdAt: workspace.createdAt,
        updatedAt: workspace.updatedAt,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  static toResponseList(
    workspaces: WorkspaceDocument[],
  ): WorkspaceResponseDto[] {
    return workspaces.map(WorkspaceMapper.toResponse);
  }

  static toSummary(
    this: void,
    workspace: WorkspaceDocument,
  ): WorkspaceSummaryResponseDto {
    return plainToInstance(
      WorkspaceSummaryResponseDto,
      {
        id: workspace?._id?.toString(),

        name: workspace.name,
        slug: workspace.slug,
        description: workspace.description,
        visibility: workspace.visibility,

        updatedAt: workspace.updatedAt,
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  static toSummaryList(
    this: void,
    workspaces: WorkspaceDocument[],
  ): WorkspaceSummaryResponseDto[] {
    return workspaces.map(WorkspaceMapper.toSummary);
  }
}
