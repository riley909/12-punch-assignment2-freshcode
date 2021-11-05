import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MenuCategory } from '../enums/menu-category.enum';
import { Item } from 'src/items/item.entity';
import { Tag } from 'src/tags/tag.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string; //MenuCategory;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  isSold: boolean;

  @Column()
  badge: string;

  // @OneToMany((_type) => Item, (item) => item.menu, { eager: true })
  @Column()
  items: string; //Item[];

  // @OneToMany((_type) => Tag, (tag) => tag.menu, { eager: true })
  @Column()
  tags: string; //Tag[];
}