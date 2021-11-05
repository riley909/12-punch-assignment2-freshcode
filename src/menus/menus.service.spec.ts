import { Test, TestingModule } from '@nestjs/testing';
import { MenusService } from './menus.service';
import { Connection, Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from '../items/entities/item.entity';
import { Tag } from '../tags/entities/tag.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import * as faker from 'faker';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  find: jest.fn(),
});

describe('MenusService', () => {
  let service: MenusService;
  let menuRepository: MockRepository;
  let itemRepository: MockRepository;
  let tagRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenusService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(Menu),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Item),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Tag),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<MenusService>(MenusService);
    menuRepository = module.get<MockRepository>(getRepositoryToken(Menu));
    itemRepository = module.get<MockRepository>(getRepositoryToken(Item));
    tagRepository = module.get<MockRepository>(getRepositoryToken(Tag));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create validation test', async () => {
    // given
    const createMenuDto: CreateMenuDto = {
      category: faker.music.genre(),
      name: faker.name.lastName(),
      description: faker.datatype.string(10),
      isSold: false,
      badge: faker.datatype.string(5),
    };
    menuRepository.save.mockResolvedValueOnce(createMenuDto);
    // when
    const result = await service.create(createMenuDto);

    // then
    expect(result.category).toEqual(createMenuDto.category);
  });

  it('findAll validation test', async () => {
    service.findAll({ limit: 10, offset: 10 });
    // then
    expect(menuRepository.find).toHaveBeenCalled();
  });

  it('findOne validation test', async () => {
    const id = faker.datatype.number();
    // given
    const findMenu: Menu = {
      id: id,
      category: faker.music.genre(),
      name: faker.name.lastName(),
      description: faker.datatype.string(10),
      isSold: false,
      badge: faker.datatype.string(10),
      items: [],
      tags: [],
    };
    menuRepository.findOne.mockResolvedValueOnce(findMenu);
    // when
    const result = await service.findOne(id);

    // then
    expect(result.id).toEqual(findMenu.id);
  });

  it('Delete test', () => {
    const id = faker.datatype.number();
    service.remove(id);
    expect(service.remove).toHaveBeenCalled();
  });
});
