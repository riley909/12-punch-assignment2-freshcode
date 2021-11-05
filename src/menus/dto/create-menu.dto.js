import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Column } from 'typeorm';

export class CreateMovieDto {
  @IsString()
  category: string; //MenuCategory;
  @IsString()
  name: string;
  @IsString()
  description: string;
  isSold: boolean;
  @IsString()
  badge: string;
  @IsString() // { each: true }
  items: string; //Item[];
  @IsString()
  tags: string; //Tag[];
}