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

  it('findAll délègue au service', async () => {
    categoryServiceMock.findAll.mockResolvedValue([{ id: 1 }]);
    await expect(controller.findAll()).resolves.toEqual([{ id: 1 }]);
    expect(categoryServiceMock.findAll).toHaveBeenCalled();
  });

  it('findOne convertit id en number et délègue', async () => {
    categoryServiceMock.findOne.mockResolvedValue({ id: 5 });
    await expect(controller.findOne('5')).resolves.toEqual({ id: 5 });
    expect(categoryServiceMock.findOne).toHaveBeenCalledWith(5);
  });

  it('create délègue au service', async () => {
    const dto: any = { name: 'C' };
    categoryServiceMock.create.mockResolvedValue({ id: 1, ...dto });
    await expect(controller.create(dto)).resolves.toEqual({ id: 1, ...dto });
    expect(categoryServiceMock.create).toHaveBeenCalledWith(dto);
  });

  it('update convertit id et délègue', async () => {
    const dto: any = { name: 'D' };
    categoryServiceMock.update.mockResolvedValue({ id: 2, ...dto });
    await expect(controller.update('2', dto)).resolves.toEqual({ id: 2, ...dto });
    expect(categoryServiceMock.update).toHaveBeenCalledWith(2, dto);
  });

  it('remove convertit id et délègue', async () => {
    categoryServiceMock.remove.mockResolvedValue({ id: 3 });
    await expect(controller.remove('3')).resolves.toEqual({ id: 3 });
    expect(categoryServiceMock.remove).toHaveBeenCalledWith(3);
  });
});