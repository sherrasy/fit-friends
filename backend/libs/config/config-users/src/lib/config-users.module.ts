import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import jwtConfig from './jwt.config';
import { ENV_USERS_FILE_PATH } from './config-users.constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [ jwtConfig],
      envFilePath: ENV_USERS_FILE_PATH
    }),
  ]
})
export class ConfigUsersModule {}
