import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  @IsString()
  readonly category?: string; //MenuCategory; ?를 붙이면 필수사항이 아님.
  @IsString()
  readonly name?: string;
  @IsString()
  readonly description?: string;
  @IsBoolean()
  readonly isSold?: boolean;
  @IsString()
  readonly badge?: string;
}
