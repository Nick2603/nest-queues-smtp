import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendEmailToCreatedUserCommand } from './send-email-to-created-user.command';
import { InjectQueue } from '@nestjs/bull';
import { queueNames } from 'src/queues-bull/queue-names';
import { Queue } from 'bull';
import { EmailDataOnUserCreatedEvent } from 'src/user/interfaces';

@CommandHandler(SendEmailToCreatedUserCommand)
export class SendEmailToCreatedUserCommandHandler
  implements ICommandHandler<SendEmailToCreatedUserCommand, void>
{
  constructor(
    @InjectQueue(queueNames.EmailsOnUserCreation)
    private readonly emailsOnUserCreationQueue: Queue<EmailDataOnUserCreatedEvent>,
  ) {}

  async execute(data: SendEmailToCreatedUserCommand): Promise<void> {
    const { firstName, lastName, email } = data;

    await this.emailsOnUserCreationQueue.add({
      firstName,
      lastName,
      email,
    });
  }
}
