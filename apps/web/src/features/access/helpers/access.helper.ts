import { ROLE_PERMISSIONS } from "../constants/role-permissions";
import { Permission } from "../types/permissions";
import { Role } from "../types/role";

const hasPermission = (role: Role, permission: Permission): boolean => {
  const permissions = ROLE_PERMISSIONS[role] ?? [];

  return permissions.includes(permission);
};

const hasAnyPermission = (role: Role, permissions: Permission[]): boolean => {
  return permissions.some((permission) => hasPermission(role, permission));
};

const hasAllPermissions = (role: Role, permissions: Permission[]): boolean => {
  return permissions.every((permission) => hasPermission(role, permission));
};

export const AccessHelper = {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,

  canCreateWorkspace(role: Role): boolean {
    return hasPermission(role, Permission.WORKSPACE_CREATE);
  },

  canPublishDocument(role: Role): boolean {
    return hasPermission(role, Permission.DOCUMENT_PUBLISH);
  },

  canManageUsers(role: Role): boolean {
    return hasPermission(role, Permission.USER_MANAGE);
  },
};
