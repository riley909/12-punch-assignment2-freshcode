import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { Item } from '../items/entities/item.entity';
import { Tag } from '../tags/entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Menu]),
    TypeOrmModule.forFeature([Item]),
    TypeOrmModule.forFeature([Tag]),
  ],
  exports: [TypeOrmModule],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
