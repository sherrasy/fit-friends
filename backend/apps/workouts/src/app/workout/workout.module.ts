import { Module } from '@nestjs/common';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy, getJwtOptions } from '@backend/util/util-core';
import { WorkoutRepository } from './workout.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [WorkoutController ],
  providers: [WorkoutService, WorkoutRepository, JwtAccessStrategy],
  exports: [WorkoutRepository]
})
export class WorkoutModule {}
