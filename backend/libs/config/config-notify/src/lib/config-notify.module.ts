import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_NOTIFY_FILE_PATH } from './config-notify.constant';
import notifyConfig from './notify.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notifyConfig],
      envFilePath: ENV_NOTIFY_FILE_PATH,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ConfigNotifyModule {}
