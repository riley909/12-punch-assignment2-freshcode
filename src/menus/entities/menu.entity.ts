import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from '../../items/entities/item.entity';
import { Tag } from '../../tags/entities/tag.entity';

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

  @OneToMany((_type) => Item, (item) => item.menu, { eager: true })
  items: Item[];

  @OneToMany((_type) => Tag, (tag) => tag.menu, { eager: true })
  tags: Tag[];
}
