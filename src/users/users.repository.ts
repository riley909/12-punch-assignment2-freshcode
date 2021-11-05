import { EntityRepository, Repository } from 'typeorm';
import { Users } from './users.entity';


@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {

  getSingleUser(userId: number): Promise<Users> {
    return this.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('user.id = :userId', { userId })
      .getOne();
  }

}