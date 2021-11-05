import { PartialType } from '@nestjs/swagger';
import { CreateTagDto } from './create-tag.dto';
import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTagDto extends PartialType(CreateTagDto) {
  @IsNumber()
  @ApiProperty()
  readonly menuId?: number;

  @IsString()
  @ApiProperty()
  readonly type?: string; //TagType;

  @IsString()
  @ApiProperty()
  readonly name?: string; //Menu;
}
