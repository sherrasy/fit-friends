import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import jwtConfig from './jwt.config';
import { ENV_WORKOUTS_FILE_PATH } from './config-workouts.constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [jwtConfig],
      envFilePath: ENV_WORKOUTS_FILE_PATH
    }),
  ]
})
export class ConfigWorkoutsModule {}
