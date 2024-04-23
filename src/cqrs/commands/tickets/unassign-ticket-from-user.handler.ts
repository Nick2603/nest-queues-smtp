import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TicketsQueryRepository } from 'src/ticket/tickets.query-repository';
import { UsersQueryRepository } from 'src/user/users.query-repository';
import { TicketsRepository } from 'src/ticket/tickets.repository';
import { BadRequestException } from '@nestjs/common';
import { Ticket } from 'src/ticket/ticket.entity';
import { UnassignTicketFromUserCommand } from './unassign-ticket-from-user.command';

@CommandHandler(UnassignTicketFromUserCommand)
export class UnassignTicketFromUserCommandHandler
  implements ICommandHandler<UnassignTicketFromUserCommand, Ticket>
{
  constructor(
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly ticketsQueryRepository: TicketsQueryRepository,
    private readonly ticketsRepository: TicketsRepository,
  ) {}

  async execute({
    userId,
    ticketId,
  }: UnassignTicketFromUserCommand): Promise<Ticket> {
    const user = await this.usersQueryRepository.findById(userId);

    if (!user) throw new BadRequestException('User not found');

    const ticket = await this.ticketsQueryRepository.findById(ticketId);

    if (!ticket) throw new BadRequestException('Ticket not found');

    if (!ticket.holder || ticket.holder.id !== user.id)
      throw new BadRequestException('Invalid data');

    return this.ticketsRepository.unassignTicketFromUser(ticket);
  }
}
