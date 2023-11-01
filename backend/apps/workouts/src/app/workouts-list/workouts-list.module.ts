import { JwtAccessStrategy, getJwtOptions } from '@backend/util/util-core';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { NotifyModule } from '../notify/notify.module';
import { WorkoutModule } from '../workout/workout.module';
import { WorkoutsListController } from './workouts-list.controller';
import { WorkoutsListService } from './workouts-list.service';

@Module({
  imports: [
    WorkoutModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    NotifyModule,
  ],
  controllers: [WorkoutsListController],
  providers: [WorkoutsListService, JwtAccessStrategy],
})
export class WorkoutsListModule {}
