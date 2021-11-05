import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenusService {
  private menus: Menu[] = [];
  create(createMenuDto: CreateMenuDto) {
    this.menus.push({
      id: this.menus.length + 1,
      ...createMenuDto,
    });
    return 'This action adds a new menu';
  }

  findAll(): Menu[] {
    return this.menus;
  }

  findOne(id: number): Menu {
    const menu = this.menus.find((menu) => menu.id === id);
    if (!menu) {
      throw new NotFoundException(`Menu with ID: ${id} not found`);
    }
    return menu;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = this.findOne(id);
    this.remove(id);
    this.menus.push({ ...menu, ...updateMenuDto });
    return `This action updates a #${id} menu`;
  }

  remove(id: number): boolean {
    this.findOne(id);
    this.menus = this.menus.filter((menu) => menu.id !== id);
    return true;
  }
}
