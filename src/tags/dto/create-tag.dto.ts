import { Column, ManyToOne } from 'typeorm';
import { TagType } from '../enums/tag-type.enum';
import { Menu } from '../../menus/entities/menu.entity';
import { IsNumber, IsString } from 'class-validator';

export class CreateTagDto {
  @IsNumber()
  readonly menuId: number;
  @IsString()
  readonly type: string; //TagType;
  @IsString()
  readonly menu: string; //Menu;
}
