import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from './configuration';
import { PluralNamingStrategy } from 'src/database/naming.strategy';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class ConfigWrapperService {
  constructor(
    private readonly configService: ConfigService<ConfigurationType>,
  ) {}

  get appPort(): number {
    return this.configService.get('app.port', { infer: true });
  }

  get dataBaseConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('database.host', { infer: true }),
      port: this.configService.get('database.port', { infer: true }),
      username: this.configService.get('database.user', { infer: true }),
      password: this.configService.get('database.password', { infer: true }),
      database: this.configService.get('database.name', { infer: true }),
      entities: [],
      namingStrategy: new PluralNamingStrategy(),
      synchronize: true,
      autoLoadEntities: true,
      logging: 'all',
    };
  }
}
