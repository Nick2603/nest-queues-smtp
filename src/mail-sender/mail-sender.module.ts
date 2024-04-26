import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigWrapperModule } from 'src/config/config-wrapper.module';
import { ConfigWrapperService } from 'src/config/config-wrapper.service';

export const MailerSetUp = MailerModule.forRootAsync({
  imports: [ConfigWrapperModule],
  useFactory: (configWrapperService: ConfigWrapperService) =>
    configWrapperService.mailerConfig,
  inject: [ConfigWrapperService],
});
