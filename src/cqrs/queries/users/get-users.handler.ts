import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import { UsersQueryRepository } from 'src/user/users.query-repository';
import { User } from 'src/user/user.entity';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler
  implements IQueryHandler<GetUsersQuery, User[]>
{
  constructor(private readonly usersQueryRepository: UsersQueryRepository) {}

  async execute(query: GetUsersQuery): Promise<User[]> {
    return this.usersQueryRepository.find(query);
  }
}
