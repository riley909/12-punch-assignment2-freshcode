import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  private items: Item[] = [];
  create(createItemDto: CreateItemDto) {
    this.items.push({
      id: this.items.length + 1,
      ...createItemDto,
    });
    return 'This action adds a new item';
  }

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: number): Item {
    const item = this.items.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException(`Item with ID: ${id} not found`);
    }
    return item;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    const item = this.findOne(id);
    this.remove(id);
    this.items.push({ ...item, ...UpdateItemDto });
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    this.findOne(id);
    this.items = this.items.filter((item) => item.id !== id);
    return true;
  }
}
