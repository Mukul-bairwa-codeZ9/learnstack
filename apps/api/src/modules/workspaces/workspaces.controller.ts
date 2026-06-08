import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { WorkspacesService } from './workspaces.service';

import {
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
} from './dto/workspace.dto';

import { CurrentUser } from '../access/decorators/current-user.decorator';
import { Permissions } from '../access/decorators/permissions.decorator';

import { PermissionsGuard } from '../access/guards/permissions.guard';

import { Permission } from '../access/enums/permission.enum';
import { CurrentUser as CurrentUserType } from '../access/interfaces/current-user.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('workspaces')
@UseGuards(JwtAuthGuard,PermissionsGuard)
export class WorkspacesController {
  constructor(
    private readonly workspacesService: WorkspacesService,
  ) {}

  @Post()
  @Permissions(Permission.WORKSPACE_CREATE)
  create(
    @CurrentUser() user: CurrentUserType,
    @Body() dto: CreateWorkspaceDto,
  ) {
    return this.workspacesService.create(
      user.id,
      dto,
    );
  }

  @Get()
  @Permissions(Permission.WORKSPACE_VIEW)
  findAll(
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.workspacesService.findAllForUser(
      user.id,
    );
  }

  @Get(':id')
  @Permissions(Permission.WORKSPACE_VIEW)
  findOne(
    @Param('id') workspaceId: string,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.workspacesService.findOneForUser(
      workspaceId,
      user.id,
    );
  }

  @Patch(':id')
  @Permissions(Permission.WORKSPACE_UPDATE)
  update(
    @Param('id') workspaceId: string,
    @CurrentUser() user: CurrentUserType,
    @Body() dto: UpdateWorkspaceDto,
  ) {
    return this.workspacesService.updateWorkspace(
      workspaceId,
      user.id,
      dto,
    );
  }

  @Delete(':id')
  @Permissions(Permission.WORKSPACE_DELETE)
  remove(
    @Param('id') workspaceId: string,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.workspacesService.deleteWorkspace(
      workspaceId,
      user.id,
    );
  }
}