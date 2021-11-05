import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors, UseGuards } from '@nestjs/common';
import { Roles } from './decorators/roles.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { Role } from './roles.types';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { RolesGuard } from './guards/roles.guard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOneQuery(id);
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto,) {
        return this.usersService.create(createUserDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: Partial<Users>) {
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
