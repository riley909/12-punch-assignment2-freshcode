import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {

  @IsString()
  @ApiProperty()
  readonly category: string; //MenuCategory;

  @IsString()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsBoolean()
  @ApiProperty()
  readonly isSold: boolean;

  @IsString()
  @ApiProperty()
  readonly badge: string;
  
}
