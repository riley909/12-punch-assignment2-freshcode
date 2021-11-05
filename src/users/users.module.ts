import { UsersRepository } from './users.repository';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, UsersRepository]),
  ],
  providers: [
    UsersService,
    // RolesGuard,
  ],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
