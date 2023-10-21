import { Injectable, NotFoundException } from '@nestjs/common';
import { UserInfoRepository } from './user-info.repository';
import { UserQuery } from '@backend/shared-quieries';
import { UserInfoError } from './user-info.constant';
import { User } from '@backend/shared/shared-types';
import { UserInfoEntity } from './user-info.entity';
import { UpdateUserDto } from '@backend/shared/shared-dto';
import { adaptPrismaUser } from '../utils/adapt-prisma-user';

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

  public async getUserList(query:UserQuery): Promise<User[]> {
    const userList =  await this.userInfoRepository.show(query);
    if (!userList.length) {
      throw new NotFoundException (UserInfoError.EmptyList);
    }
    return userList;
  }

    public async updateUser (id:number, dto:UpdateUserDto){
    const user = await this.findById(id);
    const userEntity = new UserInfoEntity({...user, ...dto});
    return this.userInfoRepository.update(id, userEntity);
  }

    // public async updateAvatar (id:number, avatarId:string){
  //   const blogUser = await this.userInfoRepository.findById(id);
  //   const blogUserEntity = new UserInfoEntity({...blogUser, avatar:avatarId});
  //   return this.userInfoRepository.update(id, blogUserEntity);
  // }

}
