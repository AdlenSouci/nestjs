import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

describe('AuthorsController', () => {
  let controller: AuthorsController;

  const authorsServiceMock = {
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [{ provide: AuthorsService, useValue: authorsServiceMock }],
    }).compile();

    controller = module.get<AuthorsController>(AuthorsController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findOne convertit id en number et délègue', async () => {
    authorsServiceMock.findOne.mockResolvedValue({ id: 5 });

    await expect(controller.findOne('5')).resolves.toEqual({ id: 5 });
    expect(authorsServiceMock.findOne).toHaveBeenCalledWith(5);
  });
});
