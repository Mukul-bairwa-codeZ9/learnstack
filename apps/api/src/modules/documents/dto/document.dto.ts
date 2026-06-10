import { PartialType } from '@nestjs/swagger';
import {
  IsMongoId,
  IsOptional,
  IsString,
  MinLength,
  IsObject, 
  MaxLength
} from 'class-validator';

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
}


export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {}


export class DocumentQueryDto  {
  @IsOptional()
  @IsMongoId()
  workspaceId?: string;
}