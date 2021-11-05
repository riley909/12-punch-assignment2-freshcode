import { ItemName } from '../enums/item-name.enum';
import { ItemSize } from '../enums/item-size.enum';
import { Menu } from '../../menus/entities/menu.entity';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {

  @IsNumber()
  @ApiProperty()
  readonly menuId: number;

  @IsString()
  @ApiProperty()
  readonly name: string; //ItemName;

  @IsString()
  @ApiProperty()
  readonly size: string; //ItemSize;

  @IsNumber()
  @ApiProperty()
  readonly price: number;

  @IsBoolean()
  @ApiProperty()
  readonly isSold: boolean;
  
}
