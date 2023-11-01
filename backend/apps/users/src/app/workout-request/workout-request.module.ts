import { Module } from '@nestjs/common';
import { WorkoutRequestService } from './workout-request.service';
import { WorkoutRequestController } from './workout-request.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy, getJwtOptions } from '@backend/util/util-core';
import { UserInfoModule } from '../user-info/user-info.module';
import { WorkoutRequestRepository } from './workout-request.repository';
import { UserNotificationsModule } from '../user-notifications/user-notifications.module';

@Module({
  imports:[
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    UserInfoModule,
    UserNotificationsModule
  ],
  providers: [WorkoutRequestService, WorkoutRequestRepository, JwtAccessStrategy],
  controllers: [WorkoutRequestController],
})
export class WorkoutRequestModule {}
