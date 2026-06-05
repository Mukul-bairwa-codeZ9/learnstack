import { Injectable } from '@nestjs/common';

import { ROLE_PERMISSIONS } from './constants/role-permissions.constant';
import { Permission } from './enums/permission.enum';
import { Role } from './enums/role.enum';

@Injectable()
export class AccessService {
  getPermissions(role: Role): Permission[] {
    return ROLE_PERMISSIONS[role] ?? [];
  }

  hasPermission(
    role: Role,
    permission: Permission,
  ): boolean {
    return this.getPermissions(role).includes(
      permission,
    );
  }
}