import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UnhandledExceptionHandlerService } from './unhandled-exception.handler.service';

@Module({
  imports: [CqrsModule],
  providers: [UnhandledExceptionHandlerService],
  exports: [UnhandledExceptionHandlerService],
})
export class UnhandledExceptionHandlerModule {}
