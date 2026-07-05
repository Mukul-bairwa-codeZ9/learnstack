import { PartialType } from '@nestjs/swagger';

import {
  IsMongoId,
  IsOptional,
  IsString,
  MinLength,
  IsObject,
  MaxLength,
  IsIn,
} from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto';
import { DocumentStatus } from '../enums/document-status.enum';

export class CreateDocumentDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  title: string;

  @IsMongoId()
  workspaceId: string;

  @IsOptional()
  @IsObject()
  content?: Record<string, any>;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  excerpt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  category?: string;
}

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {}

export class DocumentQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsMongoId()
  workspaceId?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['title', 'createdAt', 'updatedAt'])
  sortBy: string = 'updatedAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: 'asc' | 'desc' = 'desc';
}


