import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserInfoRepository } from '../user-info/user-info.repository';
import { CreateFullUserDto, LoginUserDto } from '@backend/shared/shared-dto';
import { AuthError } from './authentication.constant';
import { RoleEntityAdapter } from '../utils/role-entity-adapter';
import { getDate } from '@backend/util/util-core';
@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userInfoRepository: UserInfoRepository,
  ) {}

  public async register(dto: CreateFullUserDto) {
    const user = {
      ...dto,
      avatar: '',
      photo: '',
      createdDate: getDate(),
      passwordHash: '',
    };

    const existUser = await this.userInfoRepository.findByEmail(dto.email);

    if (existUser) {
      throw new ConflictException(AuthError.UserExists);
    }

    const userEntity = await new RoleEntityAdapter[dto.role](user)
      .setPassword(dto.password)

    // return this.userInfoRepository.create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.userInfoRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthError.NotFound);
    }

    // const userEntity =  new RoleEntityAdapter[existUser.role](existUser);
    // if (!await userEntity.comparePassword(password)) {
    //   throw new UnauthorizedException(AuthError.PasswordWrong);
    // }

    // return userEntity.toObject();
  }

}
