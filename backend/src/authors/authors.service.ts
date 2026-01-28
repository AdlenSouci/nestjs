import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.author.create({
      data: data as any,
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
    return this.prisma.author.update({
      where: { id },
      data: data as any,
    });
  }

  async remove(id: number) {
    return this.prisma.author.delete({
      where: { id },
    });
  }
}