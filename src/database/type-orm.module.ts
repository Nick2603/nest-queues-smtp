import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigWrapperModule } from 'src/config/config-wrapper.module';
import { ConfigWrapperService } from 'src/config/config-wrapper.service';

export const TypeOrmModuleSetUp = TypeOrmModule.forRootAsync({
  imports: [ConfigWrapperModule],
  useFactory: (configWrapperService: ConfigWrapperService) =>
    configWrapperService.dataBaseConfig,
  inject: [ConfigWrapperService],
});
