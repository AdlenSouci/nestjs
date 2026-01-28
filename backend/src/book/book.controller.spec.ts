import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';

describe('BookController', () => {
  let controller: BookController;

  const bookServiceMock = {
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [{ provide: BookService, useValue: bookServiceMock }],
    }).compile();

    controller = module.get(BookController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll délègue au service', async () => {
    bookServiceMock.findAll.mockResolvedValue([{ id: 1 }]);

    await expect(controller.findAll()).resolves.toEqual([{ id: 1 }]);
    expect(bookServiceMock.findAll).toHaveBeenCalledTimes(1);
  });

  it('findOne convertit id en number et délègue', async () => {
    bookServiceMock.findOne.mockResolvedValue({ id: 12 });

    await expect(controller.findOne('12')).resolves.toEqual({ id: 12 });
    expect(bookServiceMock.findOne).toHaveBeenCalledWith(12);
  });

  it('create délègue', async () => {
    const dto: any = { title: 'T' };
    bookServiceMock.create.mockResolvedValue({ id: 1, title: 'T' });

    await expect(controller.create(dto)).resolves.toEqual({ id: 1, title: 'T' });
    expect(bookServiceMock.create).toHaveBeenCalledWith(dto);
  });

  it('update convertit id en number et délègue', async () => {
    const dto: any = { title: 'New' };
    bookServiceMock.update.mockResolvedValue({ id: 2, title: 'New' });

    await expect(controller.update('2', dto)).resolves.toEqual({ id: 2, title: 'New' });
    expect(bookServiceMock.update).toHaveBeenCalledWith(2, dto);
  });

  it('remove convertit id en number et délègue', async () => {
    bookServiceMock.remove.mockResolvedValue({ id: 3 });

    await expect(controller.remove('3')).resolves.toEqual({ id: 3 });
    expect(bookServiceMock.remove).toHaveBeenCalledWith(3);
  });
});