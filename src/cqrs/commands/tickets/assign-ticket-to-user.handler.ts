import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AssignTicketToUserCommand } from './assign-ticket-to-user.command';
import { TicketsQueryRepository } from 'src/ticket/tickets.query-repository';
import { UsersQueryRepository } from 'src/user/users.query-repository';
import { TicketsRepository } from 'src/ticket/tickets.repository';
import { BadRequestException } from '@nestjs/common';
import { Ticket } from 'src/ticket/ticket.entity';

@CommandHandler(AssignTicketToUserCommand)
export class AssignTicketToUserCommandHandler
  implements ICommandHandler<AssignTicketToUserCommand, Ticket>
{
  constructor(
    private readonly usersQueryRepository: UsersQueryRepository,
    private readonly ticketsQueryRepository: TicketsQueryRepository,
    private readonly ticketsRepository: TicketsRepository,
  ) {}

  async execute({
    userId,
    ticketId,
  }: AssignTicketToUserCommand): Promise<Ticket> {
    const user = await this.usersQueryRepository.findById(userId);

    if (!user) throw new BadRequestException('User not found');

    const ticket = await this.ticketsQueryRepository.findById(ticketId);

    if (!ticket) throw new BadRequestException('Ticket not found');

    return this.ticketsRepository.assignTicketToUser(user, ticket);
  }
}
