import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/roles.types';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('상품 태그 API')
@Controller('tags')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TagsController {
  constructor(private readonly tagsService: TagsService) { }

  @ApiOperation({ summary: '태그 등록' })
  @Post()
  @Roles(Role.Admin)
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @ApiOperation({ summary: '태그 리스트 조회' })
  @Get()
  findAll(@Query() query) {
    return this.tagsService.findAll(query);
  }

  @ApiOperation({ summary: '태그 단건 조회' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tagsService.findOne(id);
  }

  @ApiOperation({ summary: '태그 수정' })
  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: number, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(id, updateTagDto);
  }

  @ApiOperation({ summary: '태그 삭제' })
  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: number) {
    return this.tagsService.remove(id);
  }
}
