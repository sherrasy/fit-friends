import { Module } from '@nestjs/common';
import { UserInfoRepository } from './user-info.repository';
import { UserInfoController } from './user-info.controller';
import { UserInfoService } from './user-info.service';

@Module({
  controllers: [UserInfoController],
  providers: [UserInfoService, UserInfoRepository],
  exports: [UserInfoRepository]
})
export class UserInfoModule {}
