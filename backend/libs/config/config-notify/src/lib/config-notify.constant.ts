export const ENV_NOTIFY_FILE_PATH = 'apps/notify/.notify.env';

export const DEFAULT_ERROR_MESSAGE =  '[Notify Config]: Environments validation failed. Please check .env file. Error message: '

export const DefaultPort = {
  App: 3004,
  Mongo : 27017,
  Rabbit: 5672,
  Smtp:25,
} as const;
