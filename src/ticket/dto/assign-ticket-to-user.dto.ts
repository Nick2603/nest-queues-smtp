import { IsNumber, Min } from 'class-validator';

export class AssignTicketToUserDto {
  @Min(1)
  @IsNumber()
  readonly userId: number;

  @Min(1)
  @IsNumber()
  readonly ticketId: number;
}
