import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAuthorDto {
  @ApiProperty({ description: 'Nom de l’auteur' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Biographie', required: false })
  @IsString()
  @IsNotEmpty() // Ou IsOptional() si la bio n'est pas obligatoire dans la DB
  biography: string;

  @ApiProperty({ description: 'Date de naissance', required: false })
  @IsOptional()
  @Type(() => Date) // IMPORTANT : Convertit la string en Date
  @IsDate()
  birthDate?: Date;
}