import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENV_USERS_FILE_PATH } from './config-users.constant';
import jwtConfig from './jwt.config';
import rabbitConfig from './rabbit.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [jwtConfig, rabbitConfig],
      envFilePath: ENV_USERS_FILE_PATH,
    }),
  ],
})
export class ConfigUsersModule {}
