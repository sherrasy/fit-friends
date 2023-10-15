import { Injectable, NotFoundException } from '@nestjs/common';
import { UserInfoRepository } from './user-info.repository';
import { UserInfo } from '@backend/shared/shared-types';
import { UserInfoError } from './user-info.constant';

@Injectable()
export class UserInfoService {
  constructor(
    private readonly userInfoRepository: UserInfoRepository
  ) {}

  public async findById(id: number) {
    const user  = await this.userInfoRepository.findById(id);
    if (!user) {
      throw new NotFoundException (UserInfoError.NotFound);
    }
    return user;
  }

  public async getUserList(): Promise<UserInfo[]> {
    const userList =  await this.userInfoRepository.show();
    if (!userList.length) {
      throw new NotFoundException (UserInfoError.EmptyList);
    }
    return userList;
  }

}
