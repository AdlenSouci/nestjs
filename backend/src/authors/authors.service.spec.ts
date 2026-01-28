import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { PrismaService } from '../prisma.service';

describe('AuthorsService', () => {
  let service: AuthorsService;

  const prismaMock = {
    author: {
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
        AuthorsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create appelle prisma.author.create', async () => {
    const dto = { name: 'New Author', bio: 'Bio' };
    prismaMock.author.create.mockResolvedValue({ id: 1, ...dto });

    await expect(service.create(dto)).resolves.toEqual({ id: 1, ...dto });
    expect(prismaMock.author.create).toHaveBeenCalledWith({ data: dto });
  });

  it('findAll appelle prisma.author.findMany', async () => {
    prismaMock.author.findMany.mockResolvedValue([{ id: 1 }]);
    await expect(service.findAll()).resolves.toEqual([{ id: 1 }]);
    expect(prismaMock.author.findMany).toHaveBeenCalledTimes(1);
  });

  it('findOne appelle prisma.author.findUnique', async () => {
    prismaMock.author.findUnique.mockResolvedValue({ id: 1 });
    await expect(service.findOne(1)).resolves.toEqual({ id: 1 });
    expect(prismaMock.author.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('update appelle prisma.author.update', async () => {
    const dto = { name: 'Updated' };
    prismaMock.author.update.mockResolvedValue({ id: 1, ...dto });

    await expect(service.update(1, dto)).resolves.toEqual({ id: 1, ...dto });
    expect(prismaMock.author.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: dto,
    });
  });

  it('remove appelle prisma.author.delete', async () => {
    prismaMock.author.delete.mockResolvedValue({ id: 1 });
    await expect(service.remove(1)).resolves.toEqual({ id: 1 });
    expect(prismaMock.author.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});