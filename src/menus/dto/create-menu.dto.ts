import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  readonly category: string; //MenuCategory;
  @IsString()
  readonly name: string;
  @IsString()
  readonly description: string;
  @IsBoolean()
  readonly isSold: boolean;
  @IsString()
  readonly badge: string;
}
