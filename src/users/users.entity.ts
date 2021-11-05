
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from './roles.types';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  role: Role;
}