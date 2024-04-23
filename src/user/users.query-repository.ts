import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { QuerySearchParams } from './interfaces';

@Injectable()
export class UsersQueryRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async find({
    firstName,
    lastName,
    isActive,
  }: QuerySearchParams): Promise<User[]> {
    try {
      const queryBuilder = this.usersRepository.createQueryBuilder('u');

      queryBuilder.addOrderBy('u.lastName', 'ASC');
      queryBuilder.addOrderBy('u.firstName', 'DESC');

      queryBuilder.leftJoinAndSelect('u.tickets', 't');

      if (firstName)
        queryBuilder.andWhere('u.firstName ILIKE :firstName', {
          firstName: `%${firstName}%`,
        });

      if (lastName)
        queryBuilder.andWhere('u.lastName ILIKE :lastName', {
          lastName: `%${lastName}%`,
        });

      if (isActive !== undefined)
        queryBuilder.andWhere('u.isActive = :isActive', {
          isActive,
        });

      return queryBuilder.getMany();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findById(id: number): Promise<User> {
    try {
      const foundUser = await this.usersRepository.findOne({
        where: { id },
        relations: ['tickets'],
      });

      if (!foundUser) throw new NotFoundException('User not found');

      return foundUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
