import { Controller, Get, Post, Param, Body, Patch, Delete, UseGuards } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '@prisma/client';

@ApiTags('Authors')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard) // ← sécurise toutes les routes et applique le rôle
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @Roles(Role.ADMIN) // Seul ADMIN peut créer
  create(@Body() dto: CreateAuthorDto) {
    return this.authorsService.create(dto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN) // Seul ADMIN peut modifier
  update(@Param('id') id: string, @Body() dto: UpdateAuthorDto) {
    return this.authorsService.update(Number(id), dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN) // Seul ADMIN peut supprimer
  remove(@Param('id') id: string) {
    return this.authorsService.remove(Number(id));
  }

  @Get()
  findAll() {
    return this.authorsService.findAll(); // Tout le monde peut consulter
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(Number(id)); // Tout le monde peut consulter
  }
}
