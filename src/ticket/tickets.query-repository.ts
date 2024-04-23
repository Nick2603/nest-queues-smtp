import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketsQueryRepository {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketsRepository: Repository<Ticket>,
  ) {}

  async find(): Promise<Ticket[]> {
    try {
      return this.ticketsRepository.find({
        order: { date: 'asc', event: 'asc' },
        relations: ['holder'],
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findById(id: number): Promise<Ticket> {
    try {
      const foundTicket = await this.ticketsRepository.findOne({
        where: { id },
        relations: ['holder'],
      });

      if (!foundTicket) throw new NotFoundException('Ticket not found');

      return foundTicket;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
