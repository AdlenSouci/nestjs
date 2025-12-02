import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        title: dto.title,
        description: dto.description,
        publishedDate: dto.publishedDate,
        available: dto.available,
        author: { connect: { id: dto.authorId } },
        category: { connect: { id: dto.categoryId } },
      },
    });
  }

  findAll() {
    return this.prisma.book.findMany({ include: { author: true, category: true } });
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({ where: { id }, include: { author: true, category: true } });
  }

  update(id: number, dto: UpdateBookDto) {
    const data: any = { ...dto };

    if (dto.authorId) {
      data.author = { connect: { id: dto.authorId } };
      delete data.authorId;
    }
    if (dto.categoryId) {
      data.category = { connect: { id: dto.categoryId } };
      delete data.categoryId;
    }

    return this.prisma.book.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.book.delete({ where: { id } });
  }
}
