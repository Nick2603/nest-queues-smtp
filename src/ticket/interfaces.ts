export type EmailDataOnTicketUnassignFromUserEvent = {
  event: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  date: string;
};

export type EmailDataOnTicketAssignToUserEvent = {
  event: string;
  userEmail: string;
  userFirstName: string;
  userLastName: string;
  date: string;
};
