import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAuthorDto {
  @ApiPropertyOptional({ description: 'Nom de l’auteur' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Biographie' })
  @IsOptional()
  @IsString()
  biography?: string;

  @ApiPropertyOptional({ description: 'Date de naissance' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  birthDate?: Date;
}