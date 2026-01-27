import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { PrismaService } from '../prisma.service';

describe('CategoryService', () => {
  let service: CategoryService;

  const prismaMock = {
    category: {
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
        CategoryService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll appelle prisma.category.findMany avec include books', async () => {
    prismaMock.category.findMany.mockResolvedValue([{ id: 1 }]);

    await expect(service.findAll()).resolves.toEqual([{ id: 1 }]);
    expect(prismaMock.category.findMany).toHaveBeenCalledWith({
      include: { books: true },
    });
  });

  it('findOne appelle prisma.category.findUnique avec where id + include books', async () => {
    prismaMock.category.findUnique.mockResolvedValue({ id: 2 });

    await expect(service.findOne(2)).resolves.toEqual({ id: 2 });
    expect(prismaMock.category.findUnique).toHaveBeenCalledWith({
      where: { id: 2 },
      include: { books: true },
    });
  });
});
