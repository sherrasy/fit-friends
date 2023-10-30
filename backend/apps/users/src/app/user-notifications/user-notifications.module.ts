import { Module } from '@nestjs/common';
import { UserNotificationsService } from './user-notifications.service';
import { UserNotificationsController } from './user-notifications.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy, getJwtOptions } from '@backend/util/util-core';
import { UserNotificationsRepository } from './user-notifications.repository';

@Module({
  imports:[
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    })
  ],
  providers: [UserNotificationsService,UserNotificationsRepository, JwtAccessStrategy],
  controllers: [UserNotificationsController],
  exports: [UserNotificationsRepository]

})
export class UserNotificationsModule {}
