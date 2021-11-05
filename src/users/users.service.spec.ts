import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Connection, Repository } from 'typeorm';
import { UsersRepository } from './users.repository';
import { Users } from './users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as faker from 'faker';
import { CreateUserDto } from './dtos/create-user.dto';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(Users),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<MockRepository>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('fineOne validation test', async () => {
    // given
    const id = faker.datatype.number();
    const returnUsers = {
      id: id,
      email: faker.internet.email(),
      password: faker.internet.password(),
    } as Users;
    userRepository.findOne.mockResolvedValueOnce(returnUsers);

    // when
    const result = await service.findOne(id.toString());

    // then
    expect(result).toEqual(returnUsers);
  });

  it('findOneQuery validation test', async () => {
    // given
    const id = faker.datatype.number();
    const returnUsers = {
      id: id,
      email: faker.internet.email(),
      password: faker.internet.password(),
    } as Users;
    userRepository.findOne.mockResolvedValueOnce(returnUsers);

    // when
    const result = await service.findOneQuery(id.toString());

    // then
    expect(result).toEqual(returnUsers);
  });

  it('findByEmail validation test', async () => {
    // given
    const email = faker.internet.email();
    const returnUsers = {
      id: faker.datatype.number(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    } as Users;
    userRepository.findOne.mockResolvedValueOnce(returnUsers);

    // when
    const result = await service.findByEmail(email);

    // then
    expect(result).toEqual(returnUsers);
  });

  it('create validation test', async () => {
    // given
    const id = faker.datatype.number();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const createUserDto = {
      email: email,
      password: password,
    } as CreateUserDto;
    userRepository.findOne.mockReturnValue(null);
    userRepository.save.mockResolvedValueOnce({
      id: id,
      email: email,
      password: password,
    } as Users);
    // when
    const result = await service.create(createUserDto);

    // then
    expect(result.id).toEqual(id);
  });

  it('update validation test', async () => {
    // given
    const id = faker.datatype.number();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const originUser = {
      id: id,
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const updateUser = {
      email: email,
      password: password,
    };
    userRepository.findOne.mockResolvedValueOnce(originUser);
    userRepository.save.mockResolvedValueOnce({
      id: id,
      email: email,
      password: password,
    } as Users);

    // when
    const result = await service.update(id.toString(), updateUser);

    // then
    expect(result.email).toEqual(email);
    expect(result.password).toEqual(password);
  });

  it('delete validation test', async () => {
    // given
    const id = faker.datatype.number();
    const deleteUser = {
      id: id,
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    userRepository.findOne.mockResolvedValueOnce(deleteUser);
    userRepository.remove.mockResolvedValueOnce(deleteUser);

    // when
    const result = await service.remove(id.toString());

    // then
    expect(result).toEqual(deleteUser);
  });
});
