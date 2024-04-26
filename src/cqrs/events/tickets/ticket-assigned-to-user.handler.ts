import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TicketAssignedToUserEvent } from './ticket-assigned-to-user.event';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { queueNames } from 'src/queues-bull/queue-names';
import { EmailDataOnTicketAssignToUserEvent } from 'src/ticket/interfaces';

@EventsHandler(TicketAssignedToUserEvent)
export class TicketAssignedToUserEventHandler
  implements IEventHandler<TicketAssignedToUserEvent>
{
  constructor(
    @InjectQueue(queueNames.EmailsOnTicketAssign)
    private readonly emailsOnTicketAssignQueue: Queue<EmailDataOnTicketAssignToUserEvent>,
  ) {}

  async handle({
    event,
    userEmail,
    userFirstName,
    userLastName,
    date,
  }: TicketAssignedToUserEvent) {
    await this.emailsOnTicketAssignQueue.add({
      event,
      userEmail,
      userFirstName,
      userLastName,
      date,
    });
  }
}
