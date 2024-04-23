import { IsString, IsBoolean, Length, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @Length(2, 25)
  @IsString({ message: 'Please provide your first name' })
  @IsOptional()
  readonly firstName?: string;

  @Length(2, 25)
  @IsString({ message: 'Please provide your last name' })
  @IsOptional()
  readonly lastName?: string;

  @IsBoolean()
  @IsOptional()
  readonly isActive?: boolean;
}
