import { Injectable } from '@nestjs/common';

import { ROLE_PERMISSIONS } from './constants/role-permissions.constant';
import { Permission } from './enums/permission.enum';
import { Role } from './enums/role.enum';
import { WorkspaceRole } from './enums/workspace-role.enum';
import { WORKSPACE_ROLE_PERMISSIONS } from './constants/workspace-role-permissions.constant';

@Injectable()
export class AccessService {
  getPermissions(role: Role): Permission[] {
    return ROLE_PERMISSIONS[role] ?? [];
  }

  hasPermission(role: Role, permission: Permission): boolean {
    return this.getPermissions(role).includes(permission);
  }

  getWorkspacePermissions(role: WorkspaceRole): Permission[] {
    return WORKSPACE_ROLE_PERMISSIONS[role] ?? [];
  }
}
