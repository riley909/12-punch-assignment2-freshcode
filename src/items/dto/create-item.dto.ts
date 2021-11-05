import { ItemName } from '../enums/item-name.enum';
import { ItemSize } from '../enums/item-size.enum';
import { Menu } from '../../menus/entities/menu.entity';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateItemDto {
  @IsNumber()
  readonly menuId: number;
  @IsString()
  readonly name: string; //ItemName;
  @IsString()
  readonly size: string; //ItemSize;
  @IsNumber()
  readonly price: number;
  @IsBoolean()
  readonly isSold: boolean;
  @IsString()
  readonly menu: string; //Menu;
}
