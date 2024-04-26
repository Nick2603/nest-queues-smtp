import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { UsersQueryRepository } from './users.query-repository';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUsersQueryHandler } from 'src/cqrs/queries/users/get-users.handler';
import { CreateUserCommandHandler } from 'src/cqrs/commands/users/create-user.handler';
import { SendEmailToCreatedUserCommandHandler } from 'src/cqrs/commands/users/send-email-to-created-user.handler';
import { UsersSagas } from 'src/cqrs/sagas/users.sagas';
import { BullModule } from '@nestjs/bull';
import { queueNames } from 'src/queues-bull/queue-names';
import { EmailsOnUserCreationProcessor } from './emails-on-user-creation.processor';
import { MailSenderWrapperModule } from 'src/mail-sender/mail-sender-wrapper.module';

const QueryHandlers = [GetUsersQueryHandler];

const CommandHandlers = [
  CreateUserCommandHandler,
  SendEmailToCreatedUserCommandHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CqrsModule,
    BullModule.registerQueue({
      name: queueNames.EmailsOnUserCreation,
    }),
    MailSenderWrapperModule,
  ],
  providers: [
    UsersService,
    UsersRepository,
    UsersQueryRepository,
    ...QueryHandlers,
    ...CommandHandlers,
    UsersSagas,
    EmailsOnUserCreationProcessor,
  ],
  controllers: [UsersController],
  exports: [UsersQueryRepository],
})
export class UsersModule {}
