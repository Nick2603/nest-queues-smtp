import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersQuery } from 'src/cqrs/queries/users/get-users.query';
import { User } from './user.entity';
import { CreateUserCommand } from 'src/cqrs/commands/users/create-user.command';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async getUsers(
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
    @Query('isActive') isActive: boolean,
  ) {
    return this.queryBus.execute<GetUsersQuery, Promise<User[]>>(
      new GetUsersQuery(firstName, lastName, isActive),
    );
  }

  @Get(':id')
  async getUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<User> {
    return this.usersService.findById(id);
  }

  @Post()
  async createUser(
    @Body() { firstName, lastName, email, isActive }: CreateUserDto,
  ): Promise<User> {
    return this.commandBus.execute<CreateUserCommand, Promise<User>>(
      new CreateUserCommand(firstName, lastName, email, isActive),
    );
  }

  @Put(':id')
  async updateUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<void> {
    return this.usersService.remove(id);
  }
}
