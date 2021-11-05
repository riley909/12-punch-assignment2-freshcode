import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Query, UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/roles.types';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('상품 옵션 API')
@Controller('items')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }

  @ApiOperation({ summary: '옵션 등록' })
  @Post()
  @Roles(Role.Admin)
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @ApiOperation({ summary: '옵션 리스트 조회' })
  @Get()
  findAll(@Query() query) {
    return this.itemsService.findAll(query);
  }

  @ApiOperation({ summary: '옵션 단건 조회' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.itemsService.findOne(id);
  }

  @ApiOperation({ summary: '옵션 수정' })
  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: number, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(id, updateItemDto);
  }

  @ApiOperation({ summary: '옵션 삭제' })
  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: number) {
    return this.itemsService.remove(id);
  }
}
