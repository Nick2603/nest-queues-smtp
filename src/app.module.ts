import { ConfigModuleSetUp } from './config/config.module';
import { Module } from '@nestjs/common';
import { TypeOrmModuleSetUp } from './database/type-orm.module';
import { UsersModule } from './user/users.module';
import { TicketsModule } from './ticket/tickets.module';
import { UnhandledExceptionHandlerModule } from './cqrs/unhandled-exception.handler.module';
import { AppController } from './app.controller';
import { BullModuleSetUp } from './queues-bull/bull-module';
import { MailerSetUp } from './mail-sender/mail-sender.module';

@Module({
  imports: [
    ConfigModuleSetUp,
    TypeOrmModuleSetUp,
    BullModuleSetUp,
    MailerSetUp,
    UsersModule,
    TicketsModule,
    UnhandledExceptionHandlerModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
