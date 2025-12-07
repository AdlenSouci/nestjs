import { Controller, Get, Post, Param, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '@prisma/client';

@ApiTags('Books')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @Roles(Role.ADMIN) // Seul ADMIN peut créer
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  @Put(':id')
  @Roles(Role.ADMIN) // Seul ADMIN peut mettre à jour
  update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.bookService.update(Number(id), dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN) // Seul ADMIN peut supprimer
  remove(@Param('id') id: string) {
    return this.bookService.remove(Number(id));
  }

  @Get()
  findAll() {
    return this.bookService.findAll(); // Tout le monde peut consulter
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(Number(id)); // Tout le monde peut consulter
  }
}
