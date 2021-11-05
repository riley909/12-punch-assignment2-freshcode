import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('회원 API')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @ApiOperation({ summary: '회원 리스트 조회' })
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @ApiOperation({ summary: '회원 단건 조회' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOneQuery(id);
    }

    @ApiOperation({ summary: '회원 가입' })
    @Post()
    create(@Body() createUserDto: CreateUserDto,) {
        return this.usersService.create(createUserDto);
    }

    @ApiOperation({ summary: '회원 수정' })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: Partial<Users>) {
        return this.usersService.update(id, updateUserDto);
    }

    @ApiOperation({ summary: '회원 삭제' })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
