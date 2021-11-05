import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './create-tag.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @IsNumber()
  readonly menuId?: number;
  @IsString()
  readonly type?: string; //TagType;
  @IsString()
  readonly name?: string; //Menu;
}
