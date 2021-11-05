import { PartialType } from '@nestjs/swagger';
import { CreateItemDto } from './create-item.dto';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateItemDto extends PartialType(CreateItemDto) {

  @IsString()
  @ApiProperty()
  readonly name?: string; //ItemName;

  @IsString()
  @ApiProperty()
  readonly size?: string; //ItemSize;

  @IsNumber()
  @ApiProperty()
  readonly price?: number;

  @IsBoolean()
  @ApiProperty()
  readonly isSold?: boolean;

}
