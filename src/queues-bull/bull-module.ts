import { BullModule } from '@nestjs/bull';
import { ConfigWrapperModule } from 'src/config/config-wrapper.module';
import { ConfigWrapperService } from 'src/config/config-wrapper.service';

export const BullModuleSetUp = BullModule.forRootAsync({
  imports: [ConfigWrapperModule],
  useFactory: (configWrapperService: ConfigWrapperService) =>
    configWrapperService.bullConfig,
  inject: [ConfigWrapperService],
});
