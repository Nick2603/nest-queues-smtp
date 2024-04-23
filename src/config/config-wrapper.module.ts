import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigWrapperService } from './config-wrapper.service';

@Module({
  imports: [ConfigModule],
  providers: [ConfigWrapperService],
  exports: [ConfigWrapperService],
})
export class ConfigWrapperModule {}
