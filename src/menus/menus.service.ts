import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../items/entities/item.entity';
import { Tag } from '../tags/entities/tag.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const menu = this.menuRepository.save(createMenuDto);
    return menu;
  }

  async findAll(query): Promise<Menu[]> {
    const limit = query.limit || 10;
    const offset = query.offset || 1;
    console.log(limit);
    console.log(offset);
    return await this.menuRepository.find();
  }

  async findOne(id: number): Promise<Menu> {
    const menu = await this.menuRepository.findOne({ id: id });
    if (!menu) {
      throw new NotFoundException(`Menu with ID: ${id} not found`);
    }
    const item = await this.itemRepository.find({ menu: menu });
    const tag = await this.tagRepository.find({ menu: menu });

    return menu;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.findOne(id);
    console.log(updateMenuDto);
    const dto = {
      id: id,
      category: updateMenuDto.category || menu.category,
      name: updateMenuDto.name || menu.name,
      description: updateMenuDto.description || menu.description,
      isSold: updateMenuDto.isSold || menu.isSold,
      badge: updateMenuDto.badge || menu.badge,
    };
    await this.remove(id);
    await this.create(dto);
    return `This action updates a #${id} menu`;
  }

  async remove(id: number): Promise<boolean> {
    await this.findOne(id);
    const menu = await this.menuRepository.delete({ id: id });
    console.log(menu);
    return true;
  }
}
