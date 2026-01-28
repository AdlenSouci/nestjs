import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { PrismaService } from '../prisma.service';

describe('BookService', () => {
  let service: BookService;

  const prismaMock = {
    book: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create appelle prisma.book.create avec connect author/category', async () => {
    const dto: any = {
      title: 'T',
      description: 'D',
      publishedDate: new Date('2020-01-01'),
      available: true,
      authorId: 10,
      categoryId: 20,
    };

    prismaMock.book.create.mockResolvedValue({ id: 1, title: 'T' });

    await expect(service.create(dto)).resolves.toEqual({ id: 1, title: 'T' });

    expect(prismaMock.book.create).toHaveBeenCalledWith({
      data: {
        title: dto.title,
        description: dto.description,
        publishedDate: dto.publishedDate,
        available: dto.available,
        author: { connect: { id: dto.authorId } },
        category: { connect: { id: dto.categoryId } },
      },
    });
  });

  it('findAll appelle prisma.book.findMany avec include author/category', async () => {
    prismaMock.book.findMany.mockResolvedValue([{ id: 1 }]);

    await expect(service.findAll()).resolves.toEqual([{ id: 1 }]);

    expect(prismaMock.book.findMany).toHaveBeenCalledWith({
      include: { author: true, category: true },
    });
  });

  it('findOne appelle prisma.book.findUnique avec where id et include', async () => {
    prismaMock.book.findUnique.mockResolvedValue({ id: 7 });

    await expect(service.findOne(7)).resolves.toEqual({ id: 7 });

    expect(prismaMock.book.findUnique).toHaveBeenCalledWith({
      where: { id: 7 },
      include: { author: true, category: true },
    });
  });

  it('update map authorId/categoryId en connect et supprime authorId/categoryId du data', async () => {
    const dto: any = {
      title: 'New',
      authorId: 3,
      categoryId: 4,
    };

    prismaMock.book.update.mockResolvedValue({ id: 1, title: 'New' });

    await expect(service.update(1, dto)).resolves.toEqual({ id: 1, title: 'New' });

    expect(prismaMock.book.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        title: 'New',
        author: { connect: { id: 3 } },
        category: { connect: { id: 4 } },
      },
    });
  });

  it('update ne met pas connect si authorId/categoryId absents', async () => {
    const dto: any = { title: 'OnlyTitle' };
    prismaMock.book.update.mockResolvedValue({ id: 1, title: 'OnlyTitle' });

    await expect(service.update(1, dto)).resolves.toEqual({ id: 1, title: 'OnlyTitle' });

    expect(prismaMock.book.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { title: 'OnlyTitle' },
    });
  });

  it('remove appelle prisma.book.delete avec where id', async () => {
    prismaMock.book.delete.mockResolvedValue({ id: 9 });

    await expect(service.remove(9)).resolves.toEqual({ id: 9 });

    expect(prismaMock.book.delete).toHaveBeenCalledWith({
      where: { id: 9 },
    });
  });
});