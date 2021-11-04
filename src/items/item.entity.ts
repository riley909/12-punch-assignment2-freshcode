import { Menu } from 'src/menus/menu.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ItemName } from './enums/item-name.enum';
import { ItemSize } from './enums/item-size.enum';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  menuId: number;

  @Column()
  name: ItemName;

  @Column()
  size: ItemSize;

  @Column()
  price: number;

  @Column()
  isSold: boolean;

  @ManyToOne((_type) => Menu, (menu) => menu.items, { eager: false })
  menu: Menu;
}
