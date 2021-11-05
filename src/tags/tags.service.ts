import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    const item = this.tagRepository.save(createTagDto);
    return item;
  }

  async findAll(query): Promise<Tag[]> {
    const limit = query.limit || 5;
    const offset = query.offset || 1;
    console.log(limit);
    console.log(offset);
    return await this.tagRepository.find();
  }

  async findOne(id: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ id: id });
    if (!tag) {
      throw new NotFoundException(`Tag with ID: ${id} not found`);
    }
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.findOne(id);
    console.log(updateTagDto);
    const dto = {
      id: id,
      menuId: updateTagDto.menuId || tag.menuId,
      type: updateTagDto.type || tag.type,
      name: updateTagDto.name || tag.name,
    };
    await this.remove(id);
    await this.create(dto);
    return `This action updates a #${id} tag`;
  }

  async remove(id: number) {
    await this.findOne(id);
    const tag = await this.tagRepository.delete({ id: id });
    console.log(tag);
    return true;
  }
}
