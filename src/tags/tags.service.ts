import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  private tags: Tag[] = [];
  create(createTagDto: CreateTagDto) {
    this.tags.push({
      id: this.tags.length + 1,
      ...createTagDto,
    });
    return 'This action adds a new tag';
  }

  findAll(): Tag[] {
    return this.tags;
  }

  findOne(id: number): Tag {
    const tag = this.tags.find((tag) => tag.id === id);
    if (!tag) {
      throw new NotFoundException(`Tag with ID: ${id} not found`);
    }
    return tag;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    const tag = this.findOne(id);
    this.remove(id);
    this.tags.push({ ...tag, ...updateTagDto });
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    this.findOne(id);
    this.tags = this.tags.filter((tag) => tag.id !== id);
    return true;
  }
}
