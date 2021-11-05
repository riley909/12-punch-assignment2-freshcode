import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Menu } from '../../menus/entities/menu.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  menuId: number;

  @Column()
  type: string; //TagType;

  @Column()
  name: string; //ItemName;

  @ManyToOne((_type) => Menu, (menu) => menu.tags, { eager: false })
  menu: Menu;
}
