import { Column, ManyToOne } from 'typeorm';
import { TagType } from '../enums/tag-type.enum';
import { Menu } from '../../menus/entities/menu.entity';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {

  @IsNumber()
  @ApiProperty()
  readonly menuId: number;

  @IsString()
  @ApiProperty()
  readonly type: string; //TagType;
  
  @IsString()
  @ApiProperty()
  readonly name: string; //Menu;
}
