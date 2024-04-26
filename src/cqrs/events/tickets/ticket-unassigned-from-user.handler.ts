import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TicketUnassignedFromUserEvent } from './ticket-unassigned-from-user.event';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { queueNames } from 'src/queues-bull/queue-names';
import { EmailDataOnTicketUnassignFromUserEvent } from 'src/ticket/interfaces';

@EventsHandler(TicketUnassignedFromUserEvent)
export class TicketUnassignedFromUserEventHandler
  implements IEventHandler<TicketUnassignedFromUserEvent>
{
  constructor(
    @InjectQueue(queueNames.EmailsOnTicketUnassign)
    private readonly emailsOnTicketUnassignQueue: Queue<EmailDataOnTicketUnassignFromUserEvent>,
  ) {}

  async handle({
    event,
    userEmail,
    userFirstName,
    userLastName,
    date,
  }: TicketUnassignedFromUserEvent) {
    await this.emailsOnTicketUnassignQueue.add({
      event,
      userEmail,
      userFirstName,
      userLastName,
      date,
    });
  }
}
