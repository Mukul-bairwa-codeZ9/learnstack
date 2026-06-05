import { Permission } from '../types/permissions';
import { Role } from '../types/role';

export const ROLE_PERMISSIONS: Record<
  Role,
  Permission[]
> = {
  [Role.SUPER_ADMIN]: Object.values(
    Permission,
  ),

  [Role.ADMIN]: [
    Permission.WORKSPACE_CREATE,
    Permission.WORKSPACE_VIEW,
    Permission.WORKSPACE_UPDATE,
    Permission.WORKSPACE_DELETE,
    Permission.WORKSPACE_MANAGE_MEMBERS,

    Permission.DOCUMENT_CREATE,
    Permission.DOCUMENT_VIEW,
    Permission.DOCUMENT_UPDATE,
    Permission.DOCUMENT_DELETE,
    Permission.DOCUMENT_PUBLISH,
  ],

  [Role.VIEWER]: [
    Permission.WORKSPACE_VIEW,
    Permission.DOCUMENT_VIEW,
  ],
};