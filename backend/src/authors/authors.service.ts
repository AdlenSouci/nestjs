import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    const { biography, ...rest } = data;
    return this.prisma.author.create({
      data: {
        ...rest,
        biography: biography ?? '',
      },
    });
  }

  async findAll() {
    return this.prisma.author.findMany();
  }

  async findOne(id: number) {
    return this.prisma.author.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: any) {
    const { biography, ...rest } = data;
    return this.prisma.author.update({
      where: { id },
      data: {
        ...rest,
        ...(biography !== undefined ? { biography } : {}),
      },
    });
  }

  async remove(id: number) {
    return this.prisma.author.delete({
      where: { id },
    });
  }
}