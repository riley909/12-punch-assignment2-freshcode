import { PartialType } from '@nestjs/swagger';
import { CreateMenuDto } from './create-menu.dto';
import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  
  @IsString()
  @ApiProperty()
  readonly category?: string; //MenuCategory; ?를 붙이면 필수사항이 아님.
  
  @IsString()
  @ApiProperty()
  readonly name?: string;

  @IsString()
  @ApiProperty()
  readonly description?: string;

  @IsBoolean()
  @ApiProperty()
  readonly isSold?: boolean;

  @IsString()
  @ApiProperty()
  readonly badge?: string;
}
