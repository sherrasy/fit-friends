import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import {
  CONFIG_NAME,
  DEFAULT_ERROR_MESSAGE,
} from './config-bff.constant';
import { BffConfig } from './config-bff.interface';

export default registerAs(CONFIG_NAME, (): BffConfig => {
  const DEFAULT_PORT=4000;
  const config: BffConfig = {
    port: parseInt(process.env.PORT || DEFAULT_PORT.toString(), 10),
    users:process.env.USERS_APP,
    workouts:process.env.WORKOUTS_APP,
    uploader:process.env.UPLOADER_APP,
  };

  const validationSchema = Joi.object<BffConfig>({
    port: Joi.number().port().default(DEFAULT_PORT),
    users: Joi.string().required(),
    workouts: Joi.string().required(),
    uploader: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(`${DEFAULT_ERROR_MESSAGE} ${error.message}`);
  }

  return config;
});
