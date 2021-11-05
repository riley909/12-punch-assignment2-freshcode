import { Test, TestingModule } from '@nestjs/testing';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import * as faker from 'faker';
import { UpdateMenuDto } from './dto/update-menu.dto';

jest.mock('./menus.service');

describe('MenusController', () => {
  let controller: MenusController;
  let service: MenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenusController],
      providers: [MenusService],
    }).compile();

    controller = module.get<MenusController>(MenusController);
    service = module.get<MenusService>(MenusService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll test', () => {
    const query = {
      limit: faker.datatype.number(),
      offset: faker.datatype.number(),
    };
    controller.findAll(query);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('findOne test', () => {
    const id = faker.datatype.number();
    controller.findOne(id);
    expect(service.findOne).toHaveBeenCalled();
  });

  it('update test', () => {
    const id = faker.datatype.number();
    const update = {} as UpdateMenuDto;
    controller.update(id, update);
    expect(service.update).toHaveBeenCalled();
  });

  it('remove test', () => {
    const id = faker.datatype.number();
    controller.remove(id);
    expect(service.remove).toHaveBeenCalled();
  });
});
