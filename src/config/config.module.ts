import { ConfigModule } from '@nestjs/config';
import { validationOptions, validationSchema } from './joiValidation';
import configuration from './configuration';

export const ConfigModuleSetUp = ConfigModule.forRoot({
  validationSchema,
  validationOptions,
  load: [configuration],
  cache: true,
});
