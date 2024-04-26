export class TicketUnassignedFromUserEvent {
  constructor(
    public readonly event: string,
    public readonly userEmail: string,
    public readonly userFirstName: string,
    public readonly userLastName: string,
    public readonly date: string,
  ) {}
}
