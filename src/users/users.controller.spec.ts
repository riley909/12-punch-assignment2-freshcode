import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

jest.mock('./users.service');

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll test', () => {
    controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });

  it('fineOne test', () => {
    const id = '1';
    controller.findOne(id);
    expect(service.findOneQuery).toHaveBeenCalled();
  });

  it('create test', () => {
    const createUserDto = {
      email: 'wanted',
      password: 'wecode',
    } as CreateUserDto;
    controller.create(createUserDto);
    expect(service.create).toHaveBeenCalled();
  });

  it('update test', () => {
    const id = '1';
    const updateUser: any = {
      email: 'wanted',
      password: 'wecode',
    };
    controller.update(id, updateUser);
    expect(service.update).toHaveBeenCalled();
  });

  it('Delete test', () => {
    const id = '1';
    controller.remove(id);
    expect(service.remove).toHaveBeenCalled();
  });
});
