import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiPropertyOptional({ description: 'Titre du livre' })
  title?: string;

  @ApiPropertyOptional({ description: 'Description du livre' })
  description?: string;

  @ApiPropertyOptional({ description: 'ID de l’auteur' })
  authorId?: number;

  @ApiPropertyOptional({ description: 'ID de la catégorie' })
  categoryId?: number;

  @ApiPropertyOptional({ description: 'Date de publication' })
  publishedDate?: Date;

  @ApiPropertyOptional({ description: 'Disponibilité du livre' })
  available?: boolean;
}
