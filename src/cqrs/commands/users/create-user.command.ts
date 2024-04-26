import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateUserCommand implements CreateUserDto {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly isActive?: boolean,
  ) {}
}
