import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('상품 API')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @ApiOperation({ summary: '상품등록' })
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menusService.create(createMenuDto);
  }

  @ApiOperation({ summary: '상품 리스트 조회' })
  @Get()
  findAll() {
    return this.menusService.findAll();
  }

  // 비교를 위한 main.ts의 ValidationPipe() 의 transform: true 하기전 코드
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.menusService.findOne(+id); // +id를 하여 string -> number
  // }

  @ApiOperation({ summary: '상품 단건 조회' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.menusService.findOne(id);
  }

  @ApiOperation({ summary: '상품 수정' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menusService.update(id, updateMenuDto);
  }

  @ApiOperation({ summary: '상품 삭제' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.menusService.remove(id);
  }
}
