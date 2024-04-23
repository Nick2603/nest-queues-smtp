import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTicketsQuery } from './get-tickets.query';
import { TicketsQueryRepository } from 'src/ticket/tickets.query-repository';
import { Ticket } from 'src/ticket/ticket.entity';

@QueryHandler(GetTicketsQuery)
export class GetTicketsQueryHandler
  implements IQueryHandler<GetTicketsQuery, Ticket[]>
{
  constructor(
    private readonly ticketsQueryRepository: TicketsQueryRepository,
  ) {}

  async execute(): Promise<Ticket[]> {
    return this.ticketsQueryRepository.find();
  }
}
