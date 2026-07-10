import { Expose } from 'class-transformer';

import { WorkspaceVisibility } from '../enums/workspace.enums';

export class WorkspaceResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose()
  description: string;

  @Expose()
  visibility: WorkspaceVisibility;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

export class WorkspaceSummaryResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose()
  description: string;

  @Expose()
  visibility: WorkspaceVisibility;

  @Expose()
  updatedAt: Date;
}
