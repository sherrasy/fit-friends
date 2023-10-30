import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import jwtConfig from './jwt.config';
import { ENV_WORKOUTS_FILE_PATH } from './config-workouts.constant';
import rabbitConfig from './rabbit.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [jwtConfig, rabbitConfig],
      envFilePath: ENV_WORKOUTS_FILE_PATH
    }),
  ]
})
export class ConfigWorkoutsModule {}
