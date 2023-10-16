import { Injectable, NotFoundException } from '@nestjs/common';
import { UserInfoRepository } from './user-info.repository';
import { UserQuery } from '@backend/shared-quieries';
import { UserInfoError } from './user-info.constant';
import { User } from '@backend/shared/shared-types';

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

  // public async getUserList(query:UserQuery): Promise<User[]> {
  //   const userList =  await this.userInfoRepository.show(query);
  //   if (!userList.length) {
  //     throw new NotFoundException (UserInfoError.EmptyList);
  //   }
  //   return userList;
  // }

}
