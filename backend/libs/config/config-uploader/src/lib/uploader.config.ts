import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { UploaderConfig } from './config-uploader.interface';
import { CONFIG_NAME, DEFAULT_ERROR_MESSAGE, DefaultPort } from './config-uploader.constant';

export default registerAs(CONFIG_NAME, (): UploaderConfig => {
  const config: UploaderConfig = {
    serveRoot: process.env.SERVE_ROOT,
    environment: process.env.NODE_ENV,
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    port: parseInt(process.env.PORT || DefaultPort.App.toString(), 10),
    db: {
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT ?? DefaultPort.Db.toString(), 10),
      name: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      authBase: process.env.MONGO_AUTH_BASE,
    }
  };

  const validationSchema = Joi.object<UploaderConfig>({
    serveRoot: Joi.string().required(),
    environment: Joi.string().valid('development', 'production', 'stage'),
    port: Joi.number().port().default(DefaultPort.App),
    uploadDirectory: Joi.string(),
    db: Joi.object({
      host: Joi.string().valid().hostname(),
      port: Joi.number().port().default(DefaultPort.Db),
      name: Joi.string().required(),
      user: Joi.string().required(),
      password: Joi.string().required(),
      authBase: Joi.string().required(),
    })
  });

  const { error } = validationSchema.validate(config, { abortEarly: true });

  if (error) {
    throw new Error(
      `${DEFAULT_ERROR_MESSAGE} ${error.message}`,
    );
  }

  return config;
});
