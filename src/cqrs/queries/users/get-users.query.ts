import { QuerySearchParams } from 'src/user/interfaces';

export class GetUsersQuery implements QuerySearchParams {
  constructor(
    public readonly firstName?: string,
    public readonly lastName?: string,
    public readonly isActive?: boolean,
  ) {}
}
