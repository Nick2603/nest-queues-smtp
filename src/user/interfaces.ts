export type QuerySearchParams = {
  firstName?: string;
  lastName?: string;
  isActive?: boolean;
};

export type EmailDataOnUserCreatedEvent = {
  firstName: string;
  lastName: string;
  email: string;
};
