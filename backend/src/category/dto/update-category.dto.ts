import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateCategoryDto {
  @ApiPropertyOptional({ description: 'Nom de la catégorie' })
  @IsOptional()
  @IsString()
  name?: string;
}