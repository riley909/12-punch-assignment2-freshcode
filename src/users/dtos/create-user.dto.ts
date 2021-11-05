import { IsEmail, IsString } from 'class-validator'
import { Role } from '../roles.types';

export class CreateUserDto {

  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsString()
  role: Role;
}