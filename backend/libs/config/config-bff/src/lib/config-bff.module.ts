import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { ENV_FILE_PATH } from './config-bff.constant';
import bffConfig from './bff.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [bffConfig],
      envFilePath: ENV_FILE_PATH,
    }),
  ],
  providers: [],
  exports: [],
})
export class ConfigBffModule {}
