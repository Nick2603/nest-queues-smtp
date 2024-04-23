export class AssignTicketToUserCommand {
  constructor(
    public readonly userId: number,
    public readonly ticketId: number,
  ) {}
}
