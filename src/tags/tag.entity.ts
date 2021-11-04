import { Menu } from 'src/menus/menu.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TagType } from './enums/tag-type.enum';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  menuId: number;

  @Column()
  type: TagType;

  @ManyToOne((_type) => Menu, (menu) => menu.items, { eager: false })
  menu: Menu;
}
