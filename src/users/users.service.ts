import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private repo: Repository<Users>,
  ) // @InjectRepository(UsersRepository)
  // private usersCustomRepo: UsersRepository
  {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const user = await this.repo.findOne(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }
  async findOneQuery(id: string) {
    const user = await this.repo.findOne(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }
  async findByEmail(email: string) {
    const user = await this.repo.findOne({ email });
    if (!user) throw new NotFoundException(`User with #${email} was not found`);
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.repo.findOne(createUserDto.email)
    if (user) throw new BadRequestException('Email already in use');

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.repo.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.repo.save(newUser);
  }

  async update(id: string, attrs: Partial<Users>) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');

    if(attrs.password){
      const hashedPassword = await bcrypt.hash(attrs.password, 10);
      attrs.password = hashedPassword;
    }  

    Object.assign(user, attrs);
    // Using save instead of update to make use of hooks
    // Cons: accesses DB twice instead of once
    return this.repo.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.repo.remove(user);
  }
}
