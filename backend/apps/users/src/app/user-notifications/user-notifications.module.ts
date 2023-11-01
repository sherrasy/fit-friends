import { JwtAccessStrategy, getJwtOptions } from '@backend/util/util-core';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserNotificationsController } from './user-notifications.controller';
import { UserNotificationsRepository } from './user-notifications.repository';
import { UserNotificationsService } from './user-notifications.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
  ],
  providers: [
    UserNotificationsService,
    UserNotificationsRepository,
    JwtAccessStrategy,
  ],
  controllers: [UserNotificationsController],
  exports: [UserNotificationsRepository],
})
export class UserNotificationsModule {}
