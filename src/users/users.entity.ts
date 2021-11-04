
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from './roles.types';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: Role[];
}