import { IsString, IsBoolean, Length, IsOptional } from 'class-validator';

export class CreateUserDto {
  @Length(2, 25)
  @IsString({ message: 'Please provide your first name' })
  readonly firstName: string;

  @Length(2, 25)
  @IsString({ message: 'Please provide your last name' })
  readonly lastName: string;

  @IsBoolean()
  @IsOptional()
  readonly isActive?: boolean;
}
