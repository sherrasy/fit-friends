import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { FriendsRepository } from './friends.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy, getJwtOptions } from '@backend/util/util-core';
import { UserNotificationsModule } from '../user-notifications/user-notifications.module';

@Module({
  imports:[
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    UserNotificationsModule
  ],
  providers: [FriendsService, FriendsRepository, JwtAccessStrategy],
  controllers: [FriendsController],
})
export class FriendsModule {}
