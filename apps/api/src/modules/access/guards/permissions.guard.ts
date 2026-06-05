import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { AccessService } from '../access.service';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { Permission } from '../enums/permission.enum';
import { Role } from '../enums/role.enum';

@Injectable()
export class PermissionsGuard
  implements CanActivate
{
  constructor(
    private readonly reflector: Reflector,
    private readonly accessService: AccessService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const permissions =
      this.reflector.getAllAndOverride<
        Permission[]
      >(PERMISSIONS_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

    if (!permissions?.length) {
      return true;
    }

    const request =
      context.switchToHttp().getRequest();

    const user = request.user;

    if (user.role === Role.SUPER_ADMIN) {
      return true;
    }

    return permissions.every(permission =>
      this.accessService.hasPermission(
        user.role,
        permission,
      ),
    );
  }
}