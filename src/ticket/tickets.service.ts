import { Injectable } from '@nestjs/common';
import { Ticket } from './ticket.entity';
import { DeleteResult } from 'typeorm';
import { TicketsRepository } from './tickets.repository';
import { TicketsQueryRepository } from './tickets.query-repository';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    private readonly ticketsRepository: TicketsRepository,
    private readonly ticketsQueryRepository: TicketsQueryRepository,
  ) {}

  async findById(id: number): Promise<Ticket> {
    return this.ticketsQueryRepository.findById(id);
  }

  async create(dto: CreateTicketDto): Promise<Ticket> {
    return this.ticketsRepository.create(dto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.ticketsRepository.remove(id);
  }
}
