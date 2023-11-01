import { JwtAccessStrategy, getJwtOptions } from '@backend/util/util-core';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { NotifyModule } from '../notify/notify.module';
import { UserInfoController } from './user-info.controller';
import { UserInfoRepository } from './user-info.repository';
import { UserInfoService } from './user-info.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    NotifyModule,
  ],
  controllers: [UserInfoController],
  providers: [UserInfoService, UserInfoRepository, JwtAccessStrategy],
  exports: [UserInfoRepository],
})
export class UserInfoModule {}
