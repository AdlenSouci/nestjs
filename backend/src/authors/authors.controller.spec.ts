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

  it('findAll délègue au service', async () => {
    authorsServiceMock.findAll.mockResolvedValue([{ id: 1 }]);
    await expect(controller.findAll()).resolves.toEqual([{ id: 1 }]);
    expect(authorsServiceMock.findAll).toHaveBeenCalled();
  });

  it('findOne convertit id en number et délègue', async () => {
    authorsServiceMock.findOne.mockResolvedValue({ id: 5 });
    await expect(controller.findOne('5')).resolves.toEqual({ id: 5 });
    expect(authorsServiceMock.findOne).toHaveBeenCalledWith(5);
  });

  it('create délègue au service', async () => {
    const dto: any = { name: 'A' };
    authorsServiceMock.create.mockResolvedValue({ id: 1, ...dto });
    await expect(controller.create(dto)).resolves.toEqual({ id: 1, ...dto });
    expect(authorsServiceMock.create).toHaveBeenCalledWith(dto);
  });

  it('update convertit id et délègue', async () => {
    const dto: any = { name: 'B' };
    authorsServiceMock.update.mockResolvedValue({ id: 2, ...dto });
    await expect(controller.update('2', dto)).resolves.toEqual({ id: 2, ...dto });
    expect(authorsServiceMock.update).toHaveBeenCalledWith(2, dto);
  });

  it('remove convertit id et délègue', async () => {
    authorsServiceMock.remove.mockResolvedValue({ id: 3 });
    await expect(controller.remove('3')).resolves.toEqual({ id: 3 });
    expect(authorsServiceMock.remove).toHaveBeenCalledWith(3);
  });
});