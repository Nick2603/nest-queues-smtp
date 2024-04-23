import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { UsersQueryRepository } from './users.query-repository';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUsersQueryHandler } from 'src/cqrs/queries/users/get-users.handler';

const QueryHandlers = [GetUsersQueryHandler];

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  providers: [
    UsersService,
    UsersRepository,
    UsersQueryRepository,
    ...QueryHandlers,
  ],
  controllers: [UsersController],
  exports: [UsersQueryRepository],
})
export class UsersModule {}
