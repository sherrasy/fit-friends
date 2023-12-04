import { UserQuery } from '@backend/shared-quieries';
import { UpdateUserDto } from '@backend/shared/shared-dto';
import { User, UserRole } from '@backend/shared/shared-types';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserInfoError } from './user-info.constant';
import { UserInfoEntity } from './user-info.entity';
import { UserInfoRepository } from './user-info.repository';

@Injectable()
export class UserInfoService {
  constructor(private readonly userInfoRepository: UserInfoRepository) {}

  public async findById(id: number) {
    const user = await this.userInfoRepository.findById(id);
    if (!user) {
      throw new NotFoundException(UserInfoError.NotFound);
    }
    return user;
  }

  public async getUserList(id:number, query: UserQuery): Promise<User[]> {
    const userList = await this.userInfoRepository.show(id, query);
    return userList;
  }

  public async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.findById(id);
    const userEntity = new UserInfoEntity({ ...user, ...dto });
    return this.userInfoRepository.update(id, userEntity);
  }

  public async checkCoach(coachId: number) {
    const userInfo = await this.findById(coachId);
    if (userInfo.role !== UserRole.Coach) {
      throw new BadRequestException(UserInfoError.NotCoach);
    }
    return;
  }

  public async updateAvatar (id:number, avatarId:string){
    const user = await this.findById(id);
    const userEntity = new UserInfoEntity({...user, avatar:avatarId});
    return this.userInfoRepository.update(id, userEntity);
  }

  public async updatePhoto (id:number, photoId:string){
    const user = await this.findById(id);
    const userEntity = new UserInfoEntity({...user, photo:photoId});
    return this.userInfoRepository.update(id, userEntity);
  }

  public async updateCertificate (id:number, certificateId:string){
    const user = await this.findById(id);
    console.log(user)
    const certificates = user.coachInfo.certificate.split(',')
    const isExists = certificates.includes(certificateId);
    const updatedCertificate = isExists
      ? certificates.filter((item) => item !== certificateId).toString()
      : certificates.concat(certificateId).toString();
    const userEntity = new UserInfoEntity({...user, coachInfo:{certificate:updatedCertificate}});
    return this.userInfoRepository.update(id, userEntity);
  }
}
