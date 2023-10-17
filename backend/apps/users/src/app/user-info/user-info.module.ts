import { Module } from '@nestjs/common';
import { UserInfoRepository } from './user-info.repository';
import { UserInfoController } from './user-info.controller';
import { UserInfoService } from './user-info.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy, getJwtOptions } from '@backend/util/util-core';

@Module({
  imports:[
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    })
  ],
  controllers: [UserInfoController],
  providers: [UserInfoService, UserInfoRepository, JwtAccessStrategy],
  exports: [UserInfoRepository]
})
export class UserInfoModule {}
