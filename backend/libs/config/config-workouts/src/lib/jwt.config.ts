import { registerAs } from '@nestjs/config';
import { JWTConfig } from '@backend/shared/shared-types';
import * as Joi from 'joi';
import { ConfigName, DEFAULT_ERROR_MESSAGE } from './config-workouts.constant';

export default registerAs(ConfigName.Jwt, (): JWTConfig => {
  const config: JWTConfig = {
    accessTokenSecret: process.env.JWT_AT_SECRET,
    accessTokenExpiresIn: process.env.JWT_AT_EXPIRES_IN,
    refreshTokenSecret: process.env.JWT_RT_SECRET,
    refreshTokenExpiresIn: process.env.JWT_RT_EXPIRES_IN,
  };

  const validationSchema = Joi.object<JWTConfig>({
    accessTokenSecret: Joi.string().required(),
    accessTokenExpiresIn: Joi.string().required(),
    refreshTokenSecret: Joi.string().required(),
    refreshTokenExpiresIn: Joi.string().required(),
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `[JWT Config]: ${DEFAULT_ERROR_MESSAGE} ${error.message}`,
    );
  }

  return config;
});
