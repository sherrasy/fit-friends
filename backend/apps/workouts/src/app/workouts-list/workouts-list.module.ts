import { Module } from '@nestjs/common';
import { WorkoutsListController } from './workouts-list.controller';
import { WorkoutsListService } from './workouts-list.service';
import { WorkoutModule } from '../workout/workout.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy, getJwtOptions } from '@backend/util/util-core';

@Module({
  imports: [WorkoutModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    })
  ],
  controllers: [WorkoutsListController],
  providers: [WorkoutsListService, JwtAccessStrategy],
})
export class WorkoutsListModule {}
