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

  it('findAll appelle prisma.author.findMany', async () => {
    prismaMock.author.findMany.mockResolvedValue([{ id: 1 }]);

    await expect(service.findAll()).resolves.toEqual([{ id: 1 }]);
    expect(prismaMock.author.findMany).toHaveBeenCalledTimes(1);
  });
});
