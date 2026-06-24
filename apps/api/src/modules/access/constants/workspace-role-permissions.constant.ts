import { Permission } from '../enums/permission.enum';
import { WorkspaceRole } from '../enums/workspace-role.enum';

export const WORKSPACE_ROLE_PERMISSIONS: Record<WorkspaceRole, Permission[]> = {
  // =====================================
  // Owner Permissions
  // =====================================
  [WorkspaceRole.OWNER]: [
    Permission.WORKSPACE_VIEW,
    Permission.WORKSPACE_UPDATE,
    Permission.WORKSPACE_DELETE,

    Permission.DOCUMENT_CREATE,
    Permission.DOCUMENT_VIEW,
    Permission.DOCUMENT_UPDATE,
    Permission.DOCUMENT_DELETE,
    Permission.DOCUMENT_PUBLISH,
  ],

  // =====================================
  // Editor Permissions
  // =====================================

  [WorkspaceRole.EDITOR]: [
    Permission.WORKSPACE_VIEW,

    Permission.DOCUMENT_CREATE,
    Permission.DOCUMENT_VIEW,
    Permission.DOCUMENT_UPDATE,
  ],

  // =====================================
  // Viewer Permissions
  // =====================================
  [WorkspaceRole.VIEWER]: [Permission.WORKSPACE_VIEW, Permission.DOCUMENT_VIEW],
};
