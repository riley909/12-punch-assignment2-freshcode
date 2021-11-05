import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @IsString()
  readonly name?: string; //ItemName;
  @IsString()
  readonly size?: string; //ItemSize;
  @IsNumber()
  readonly price?: number;
  @IsBoolean()
  readonly isSold?: boolean;
}
