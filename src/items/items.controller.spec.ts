import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import * as faker from 'faker';
import { datatype } from 'faker';
import { UpdateItemDto } from './dto/update-item.dto';

jest.mock('./items.service');

describe('ItemsController', () => {
  let controller: ItemsController;
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [ItemsService],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create test', () => {
    controller.create({} as CreateItemDto);
    expect(service.create).toHaveBeenCalled();
  });

  it('findAll test', () => {
    controller.findAll({
      limit: faker.datatype.number(),
      offset: faker.datatype.number(),
    });
    expect(service.findAll).toHaveBeenCalled();
  });

  it('findOne test', () => {
    const id = faker.datatype.number();
    controller.findOne(id);
    expect(service.findOne).toHaveBeenCalled();
  });

  it('update test', () => {
    const id = faker.datatype.number();
    controller.update(id, {} as UpdateItemDto);
    expect(service.update).toHaveBeenCalled();
  });

  it('remove test', () => {
    const id = faker.datatype.number();
    controller.remove(id);
    expect(service.remove).toHaveBeenCalled();
  });
});
