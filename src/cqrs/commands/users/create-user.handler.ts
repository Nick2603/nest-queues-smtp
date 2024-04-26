import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { User } from 'src/user/user.entity';
import { UsersRepository } from 'src/user/users.repository';
import { UserCreatedEvent } from 'src/cqrs/events/users/user-created.event';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand, User>
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(userData: CreateUserCommand): Promise<User> {
    const user = await this.usersRepository.create(userData);

    this.eventBus.publish(
      new UserCreatedEvent(user.firstName, user.lastName, user.email),
    );

    return user;
  }
}
