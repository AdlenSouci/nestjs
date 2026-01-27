import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('CategoryController', () => {
  let controller: CategoryController;

  const categoryServiceMock = {
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [{ provide: CategoryService, useValue: categoryServiceMock }],
    }).compile();

    controller = module.get<CategoryController>(CategoryController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findOne convertit id en number et délègue', async () => {
    categoryServiceMock.findOne.mockResolvedValue({ id: 5 });

    await expect(controller.findOne('5')).resolves.toEqual({ id: 5 });
    expect(categoryServiceMock.findOne).toHaveBeenCalledWith(5);
  });
});
