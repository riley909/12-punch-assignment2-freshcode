import { Menu } from '../../menus/entities/menu.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  menuId: number;

  @Column()
  name: string; //ItemName;

  @Column()
  size: string; //ItemSize;

  @Column()
  price: number;

  @Column()
  isSold: boolean;

  @ManyToOne((_type) => Menu, (menu) => menu.items, { eager: false, onDelete: 'CASCADE'  })
  menu: Menu;
}
