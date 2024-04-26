import { join } from 'node:path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigurationType } from './configuration';
import { PluralNamingStrategy } from 'src/database/naming.strategy';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BullRootModuleOptions } from '@nestjs/bull';
import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

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

  get redisConfig() {
    return {
      host: this.configService.get('redis.host', { infer: true }),
      port: this.configService.get('redis.port', { infer: true }),
    };
  }

  get bullConfig(): BullRootModuleOptions {
    return {
      redis: this.redisConfig,
    };
  }

  get mailerConfig(): MailerOptions {
    return {
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: this.configService.get('mailer.user', { infer: true }),
          pass: this.configService.get('mailer.password', { infer: true }),
        },
      },
      preview: true,
      template: {
        dir: join(__dirname, '../../', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
      options: {
        partials: {
          dir: join(__dirname, '../../', 'templates/partials'),
          options: {
            strict: true,
          },
        },
      },
    };
  }
}
