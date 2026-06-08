import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


import { WorkspaceVisibility } from '../enums/workspace.enums';

export class CreateWorkspaceDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsEnum(WorkspaceVisibility)
  visibility?: WorkspaceVisibility;
}


export class UpdateWorkspaceDto extends PartialType(
  CreateWorkspaceDto,
) {}