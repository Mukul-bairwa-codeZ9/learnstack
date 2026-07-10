export type WorkspaceVisibility = 'PUBLIC' | 'PRIVATE';

export const WORKSPACE_VISIBILITY_LABELS: Record<WorkspaceVisibility, string> = {
  PUBLIC: "Public (Anyone can view)",
  PRIVATE: "Private (Only members can view)",
};

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description: string;
  visibility: WorkspaceVisibility;
  createdAt: string;
  updatedAt: string;
}
export interface CreateWorkspaceDto {
  name: string;
  description?: string;
}

export interface UpdateWorkspaceDto {
  name?: string;
  description?: string;
}