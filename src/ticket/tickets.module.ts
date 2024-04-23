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

const QueryHandlers = [GetTicketsQueryHandler];

const CommandHandlers = [
  AssignTicketToUserCommandHandler,
  UnassignTicketFromUserCommandHandler,
];

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), CqrsModule, UsersModule],
  providers: [
    TicketsService,
    TicketsRepository,
    TicketsQueryRepository,
    ...QueryHandlers,
    ...CommandHandlers,
  ],
  controllers: [TicketsController],
})
export class TicketsModule {}
