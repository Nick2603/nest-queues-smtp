import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const user = new User();

      user.firstName = dto.firstName;
      user.lastName = dto.lastName;

      if (dto.isActive !== undefined) user.isActive = dto.isActive;

      return this.usersRepository.save(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    try {
      const userToUpdate = await this.usersRepository.findOneBy({
        id,
      });

      if (!userToUpdate) throw new NotFoundException('User not found');

      if (dto.firstName) userToUpdate.firstName = dto.firstName;

      if (dto.lastName) userToUpdate.lastName = dto.lastName;

      if (dto.isActive !== undefined) userToUpdate.isActive = dto.isActive;

      return this.usersRepository.save(userToUpdate);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
