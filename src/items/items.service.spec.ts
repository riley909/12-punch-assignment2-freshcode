import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import * as faker from 'faker';
import { Connection, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  find: jest.fn(),
});

describe('ItemsService', () => {
  let service: ItemsService;
  let itemRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(Item),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    itemRepository = module.get<MockRepository>(getRepositoryToken(Item));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create validation test', async () => {
    // given
    const createItemDto: CreateItemDto = {
      menuId: faker.datatype.number(),
      name: faker.name.lastName(),
      size: faker.datatype.string(1),
      price: faker.datatype.number(),
      isSold: false,
    };
    itemRepository.save.mockResolvedValueOnce(createItemDto);
    // when
    const result = await service.create(createItemDto);
    expect(result).toEqual(createItemDto);
  });

  it('findAll validation test', async () => {
    service.findAll({ limit: 10, offset: 10 });
    // then
    expect(itemRepository.find).toHaveBeenCalled();
  });

  it('findOne validation test', async () => {
    // given
    const id = faker.datatype.number();
    const item = {
      id: id,
      menuId: faker.datatype.number(),
      name: faker.name.lastName(),
      size: faker.datatype.string(1),
      price: faker.datatype.number(),
      isSold: false,
    } as Item;
    itemRepository.findOne.mockResolvedValueOnce(item);
    // when
    const result = await service.findOne(id);
    // then
    expect(result.id).toEqual(id);
  });

  it('Delete test', () => {
    const id = faker.datatype.number();
    service.remove(id);
    expect(service.remove).toBeTruthy();
  });
});
