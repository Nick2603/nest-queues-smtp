import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersQueryRepository } from './users.query-repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersQueryRepository: UsersQueryRepository,
  ) {}

  async findById(id: number): Promise<User> {
    return this.usersQueryRepository.findById(id);
  }

  async create(dto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(dto);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    return this.usersRepository.update(id, dto);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.remove(id);
  }
}
