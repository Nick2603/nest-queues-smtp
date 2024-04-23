import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { GetTicketsQuery } from 'src/cqrs/queries/tickets/get-tickets.query';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { AssignTicketToUserCommand } from 'src/cqrs/commands/tickets/assign-ticket-to-user.command';
import { AssignTicketToUserDto } from './dto/assign-ticket-to-user.dto';
import { UnassignTicketFromUserCommand } from 'src/cqrs/commands/tickets/unassign-ticket-from-user.command';
import { UnassignTicketFromUserDto } from './dto/unassign-ticket-from-user.dto';
import { Ticket } from './ticket.entity';
import { DeleteResult } from 'typeorm';

@Controller('tickets')
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async getTickets() {
    return this.queryBus.execute<GetTicketsQuery, Promise<Ticket[]>>(
      new GetTicketsQuery(),
    );
  }

  @Get(':id')
  async getTicket(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Ticket> {
    return this.ticketsService.findById(id);
  }

  @Post()
  async createTicket(
    @Body() createTicketDto: CreateTicketDto,
  ): Promise<Ticket> {
    return this.ticketsService.create(createTicketDto);
  }

  @Delete(':id')
  async deleteTicket(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<DeleteResult> {
    return this.ticketsService.remove(id);
  }

  @Put('assign-ticket-to-user')
  async assignTicketToUser(
    @Body() { userId, ticketId }: AssignTicketToUserDto,
  ) {
    return this.commandBus.execute<AssignTicketToUserCommand, Promise<Ticket>>(
      new AssignTicketToUserCommand(userId, ticketId),
    );
  }

  @Put('unassign-ticket-from-user')
  async unassignTicketFromUser(
    @Body() { userId, ticketId }: UnassignTicketFromUserDto,
  ) {
    return this.commandBus.execute<
      UnassignTicketFromUserCommand,
      Promise<Ticket>
    >(new UnassignTicketFromUserCommand(userId, ticketId));
  }
}
