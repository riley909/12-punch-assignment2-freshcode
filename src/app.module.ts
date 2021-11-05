import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { MenusModule } from './menus/menus.module';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'wanted',
      database: 'wanted',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    TagsModule,
    MenusModule,
    ItemsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
