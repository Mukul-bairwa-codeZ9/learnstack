import { Module } from '@nestjs/common';

import { AccessService } from './access.service';
import { PermissionsGuard } from './guards/permissions.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  providers: [
    AccessService,
    RolesGuard,
    PermissionsGuard,
  ],
  exports: [
    AccessService,
    RolesGuard,
    PermissionsGuard,
  ],
})
export class AccessModule {}