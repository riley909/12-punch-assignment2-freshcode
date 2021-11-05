import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const item = this.itemRepository.save(createItemDto);
    return item;
  }

  async findAll(query): Promise<Item[]> {
    const limit = query.limit || 5;
    const offset = query.offset || 1;
    console.log(limit);
    console.log(offset);
    return await this.itemRepository.find();
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({ id: id });
    if (!item) {
      throw new NotFoundException(`Item with ID: ${id} not found`);
    }
    return item;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.findOne(id);
    console.log(updateItemDto);
    const dto = {
      id: id,
      menuId: updateItemDto.menuId || item.menuId,
      name: updateItemDto.name || item.name,
      size: updateItemDto.size || item.size,
      price: updateItemDto.price || item.price,
      isSold: updateItemDto.isSold || item.isSold,
    };
    await this.remove(id);
    await this.create(dto);
    return `This action updates a #${id} item`;
  }

  async remove(id: number) {
    await this.findOne(id);
    const item = await this.itemRepository.delete({ id: id });
    console.log(item);
    return true;
  }
}
