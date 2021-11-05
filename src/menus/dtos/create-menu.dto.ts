import { IsEmail, IsString, IsBoolean } from 'class-validator'

export class CreateMenuDto {

  @IsString()
  category: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  isSold: boolean;

  @IsString()
  badge: string;

}