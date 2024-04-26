import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { GetTicketsQueryHandler } from 'src/cqrs/queries/tickets/get-tickets.handler';
import { TicketsQueryRepository } from './tickets.query-repository';
import { CqrsModule } from '@nestjs/cqrs';
import { TicketsController } from './tickets.controller';
import { TicketsRepository } from './tickets.repository';
import { TicketsService } from './tickets.service';
import { AssignTicketToUserCommandHandler } from 'src/cqrs/commands/tickets/assign-ticket-to-user.handler';
import { UsersModule } from 'src/user/users.module';
import { UnassignTicketFromUserCommandHandler } from 'src/cqrs/commands/tickets/unassign-ticket-from-user.handler';
import { TicketAssignedToUserEventHandler } from 'src/cqrs/events/tickets/ticket-assigned-to-user.handler';
import { TicketUnassignedFromUserEventHandler } from 'src/cqrs/events/tickets/ticket-unassigned-from-user.handler';
import { BullModule } from '@nestjs/bull';
import { queueNames } from 'src/queues-bull/queue-names';
import { EmailsOnTicketAssignProcessor } from './emails-on-ticket-assign.processor';
import { EmailsOnTicketUnassignProcessor } from './emails-on-ticket-unassign.processor';
import { MailSenderWrapperModule } from 'src/mail-sender/mail-sender-wrapper.module';

const QueryHandlers = [GetTicketsQueryHandler];

const CommandHandlers = [
  AssignTicketToUserCommandHandler,
  UnassignTicketFromUserCommandHandler,
];

const EventHandlers = [
  TicketAssignedToUserEventHandler,
  TicketUnassignedFromUserEventHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    CqrsModule,
    UsersModule,
    BullModule.registerQueue(
      {
        name: queueNames.EmailsOnTicketAssign,
      },
      {
        name: queueNames.EmailsOnTicketUnassign,
      },
    ),
    MailSenderWrapperModule,
  ],
  providers: [
    TicketsService,
    TicketsRepository,
    TicketsQueryRepository,
    ...QueryHandlers,
    ...CommandHandlers,
    ...EventHandlers,
    EmailsOnTicketAssignProcessor,
    EmailsOnTicketUnassignProcessor,
  ],
  controllers: [TicketsController],
})
export class TicketsModule {}
