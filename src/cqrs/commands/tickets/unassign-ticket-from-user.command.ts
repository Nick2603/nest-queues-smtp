export class UnassignTicketFromUserCommand {
  constructor(
    public readonly userId: number,
    public readonly ticketId: number,
  ) {}
}
