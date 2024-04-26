import { Module } from '@nestjs/common';
import { MailSenderService } from './mail-sender.service';

@Module({
  imports: [],
  providers: [MailSenderService],
  exports: [MailSenderService],
})
export class MailSenderWrapperModule {}
