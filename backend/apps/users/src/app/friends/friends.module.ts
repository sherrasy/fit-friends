import { JwtAccessStrategy, getJwtOptions } from '@backend/util/util-core';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserNotificationsModule } from '../user-notifications/user-notifications.module';
import { FriendsController } from './friends.controller';
import { FriendsRepository } from './friends.repository';
import { FriendsService } from './friends.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    UserNotificationsModule,
  ],
  providers: [FriendsService, FriendsRepository, JwtAccessStrategy],
  controllers: [FriendsController],
})
export class FriendsModule {}
