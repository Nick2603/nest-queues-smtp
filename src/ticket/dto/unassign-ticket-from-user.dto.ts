import { IsNumber, Min } from 'class-validator';

export class UnassignTicketFromUserDto {
  @Min(1)
  @IsNumber()
  readonly userId: number;

  @Min(1)
  @IsNumber()
  readonly ticketId: number;
}
