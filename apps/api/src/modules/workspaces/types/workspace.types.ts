import { WorkspaceVisibility } from "../enums/workspace.enums";

export interface  CreateWorkspaceData {
  name: string;
  slug: string;
  description?: string;
  visibility?: WorkspaceVisibility;
  ownerId: string;
};