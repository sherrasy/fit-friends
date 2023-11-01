import { JwtAccessStrategy, getJwtOptions } from '@backend/util/util-core';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { WorkoutController } from './workout.controller';
import { WorkoutRepository } from './workout.repository';
import { WorkoutService } from './workout.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  controllers: [WorkoutController],
  providers: [WorkoutService, WorkoutRepository, JwtAccessStrategy],
  exports: [WorkoutRepository],
})
export class WorkoutModule {}
