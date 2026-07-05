import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from '../../../common/dto'; 

export class PublicDocumentsQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({
    description: 'Search term matching title or SEO fields',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Filter content by category name' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: 'Sort order criteria',
    enum: ['newest', 'oldest', 'updated'],
    default: 'newest',
  })
  @IsOptional()
  @IsIn(['newest', 'oldest', 'updated'])
  sort: 'newest' | 'oldest' | 'updated' = 'newest';
}