import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export const validationSchema: ConfigModuleOptions['validationSchema'] =
  Joi.object({
    APP_PORT: Joi.number().port(),
    POSTGRES_DB: Joi.string(),
    POSTGRES_USER: Joi.string(),
    POSTGRES_PASSWORD: Joi.string(),
    DB_HOST: Joi.string(),
    DB_PORT: Joi.number().port(),
    PGADMIN_DEFAULT_EMAIL: Joi.string().email(),
    PGADMIN_DEFAULT_PASSWORD: Joi.string(),
  });

export const validationOptions: ConfigModuleOptions['validationOptions'] = {
  abortEarly: true,
};
