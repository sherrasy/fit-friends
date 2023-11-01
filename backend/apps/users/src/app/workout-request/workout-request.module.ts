import { JwtAccessStrategy, getJwtOptions } from '@backend/util/util-core';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserInfoModule } from '../user-info/user-info.module';
import { UserNotificationsModule } from '../user-notifications/user-notifications.module';
import { WorkoutRequestController } from './workout-request.controller';
import { WorkoutRequestRepository } from './workout-request.repository';
import { WorkoutRequestService } from './workout-request.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    UserInfoModule,
    UserNotificationsModule,
  ],
  providers: [
    WorkoutRequestService,
    WorkoutRequestRepository,
    JwtAccessStrategy,
  ],
  controllers: [WorkoutRequestController],
})
export class WorkoutRequestModule {}
