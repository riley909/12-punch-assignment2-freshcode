import { BadRequestException, HttpException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private repo: Repository<Users>
  ) { }

  findAll(@Query('email') email: string) {
    return this.repo.find({ email });
  }

  async findOne(id: string) {
    const user = await this.repo.findOne(id)
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOne(createUserDto.email);
    if (user) {
      throw new BadRequestException('중복 된 사용자 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.repo.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.repo.save(newUser);
  }

  async update(id: string, attrs: Partial<Users>) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found')

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
