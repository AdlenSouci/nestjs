// src/authors/authors.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}  

  create(data: CreateAuthorDto) {
    return this.prisma.author.create({ data });
  }

  findAll() {
    return this.prisma.author.findMany();
  }

  findOne(id: number) {
    return this.prisma.author.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateAuthorDto) {
    return this.prisma.author.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.author.delete({ where: { id } });
  }
}
