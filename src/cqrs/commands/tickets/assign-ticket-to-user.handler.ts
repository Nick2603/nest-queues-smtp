import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AssignTicketToUserCommand } from './assign-ticket-to-user.command';
import { TicketsQueryRepository } from 'src/ticket/tickets.query-repository';
import { UsersQueryRepository } from 'src/user/users.query-repository';
import { TicketsRepository } from 'src/ticket/tickets.repository';
import { BadRequestException } from '@nestjs/common';
import { Ticket } from 'src/ticket/ticket.entity';
import { TicketAssignedToUserEvent } from 'src/cqrs/events/tickets/ticket-assigned-to-user.event';

@CommandHandler(AssignTicketToUserCommand)
export class AssignTicketToUserCommandHandler
  implements ICommandHandler<AssignTicketToUserCommand, Ticket>
{
  constructor(
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly ticketsQueryRepository: TicketsQueryRepository,
    private readonly ticketsRepository: TicketsRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute({
    userId,
    ticketId,
  }: AssignTicketToUserCommand): Promise<Ticket> {
    const user = await this.usersQueryRepository.findById(userId);

    if (!user) throw new BadRequestException('User not found');

    const ticket = await this.ticketsQueryRepository.findById(ticketId);

    if (!ticket) throw new BadRequestException('Ticket not found');

    const assignedTicket = await this.ticketsRepository.assignTicketToUser(
      user,
      ticket,
    );

    this.eventBus.publish(
      new TicketAssignedToUserEvent(
        assignedTicket.event,
        user.email,
        user.firstName,
        user.lastName,
        assignedTicket.date,
      ),
    );

    return assignedTicket;
  }
}
