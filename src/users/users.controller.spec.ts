import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

fdescribe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: any;
  let fakeAuthService: any;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (email) => { return Promise.resolve({ email: 'test@test.com', password: 'test' }) },
      findAll: () => { },
      update: () => { },
      remove: () => { },
    }
    fakeAuthService = {
      validateUser: () => { },
      login: () => { },
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });


  // find one
  // create
  // update
  // delete

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('user should be created', () => {
    expect(controller).toBeDefined();
  });
});
