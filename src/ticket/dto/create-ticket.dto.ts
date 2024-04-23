import { IsDateString, IsString, Length } from 'class-validator';

export class CreateTicketDto {
  @Length(2, 25)
  @IsString({ message: 'Please provide event name' })
  readonly event: string;

  @IsDateString({}, { message: 'Please provide event date' })
  readonly date: Date;
}
