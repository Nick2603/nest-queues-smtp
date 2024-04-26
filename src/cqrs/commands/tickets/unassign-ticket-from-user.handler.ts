import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { TicketsQueryRepository } from 'src/ticket/tickets.query-repository';
import { UsersQueryRepository } from 'src/user/users.query-repository';
import { TicketsRepository } from 'src/ticket/tickets.repository';
import { BadRequestException } from '@nestjs/common';
import { Ticket } from 'src/ticket/ticket.entity';
import { UnassignTicketFromUserCommand } from './unassign-ticket-from-user.command';
import { TicketUnassignedFromUserEvent } from 'src/cqrs/events/tickets/ticket-unassigned-from-user.event';

@CommandHandler(UnassignTicketFromUserCommand)
export class UnassignTicketFromUserCommandHandler
  implements ICommandHandler<UnassignTicketFromUserCommand, Ticket>
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
  }: UnassignTicketFromUserCommand): Promise<Ticket> {
    const user = await this.usersQueryRepository.findById(userId);

    if (!user) throw new BadRequestException('User not found');

    const ticket = await this.ticketsQueryRepository.findById(ticketId);

    if (!ticket) throw new BadRequestException('Ticket not found');

    const ticketHolder = ticket.holder;

    if (!ticketHolder || ticketHolder.id !== user.id)
      throw new BadRequestException('Invalid data');

    const unassignedTicket =
      await this.ticketsRepository.unassignTicketFromUser(ticket);

    this.eventBus.publish(
      new TicketUnassignedFromUserEvent(
        unassignedTicket.event,
        ticketHolder.email,
        ticketHolder.firstName,
        ticketHolder.lastName,
        unassignedTicket.date,
      ),
    );

    return unassignedTicket;
  }
}
