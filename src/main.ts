import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigWrapperService } from './config/config-wrapper.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configWrapperService = app.get(ConfigWrapperService);
  const PORT = configWrapperService.appPort;

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, stopAtFirstError: true }),
  );

  await app.listen(PORT);
}

bootstrap();
