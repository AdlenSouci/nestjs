import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @ApiProperty({ description: 'Titre du livre' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Description du livre', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'ID de l’auteur' })
  @IsInt()
  @IsNotEmpty()
  authorId: number;

  @ApiProperty({ description: 'ID de la catégorie' })
  @IsInt()
  @IsNotEmpty()
  categoryId: number;

  @ApiProperty({ description: 'Date de publication' })
  @Type(() => Date) // <--- CRUCIAL : Transforme la string reçue du React en Date
  @IsDate()         // <--- Valide que c'est une date
  publishedDate: Date;

  @ApiProperty({ description: 'Disponibilité du livre' })
  @IsBoolean()
  available: boolean;
}