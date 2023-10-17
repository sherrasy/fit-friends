import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserInfoRepository } from '../user-info/user-info.repository';
import { CreateUserDto, LoginUserDto } from '@backend/shared/shared-dto';
import { AuthError } from './authentication.constant';
import { createJWTPayload, getDate } from '@backend/util/util-core';
import { UserInfoEntity } from '../user-info/user-info.entity';
import { User } from '@backend/shared/shared-types';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from '@backend/config/config-users';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userInfoRepository: UserInfoRepository,
    private readonly jwtService: JwtService,
    @Inject (jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,

  ) {}

  public async register(dto: CreateUserDto) {
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

    const userEntity = await new UserInfoEntity(user).setPassword(dto.password)

    return this.userInfoRepository.create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.userInfoRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthError.NotFound);
    }

    const blogUserEntity = new UserInfoEntity(existUser);
    if (!await blogUserEntity.comparePassword(password)) {
      throw new UnauthorizedException(AuthError.PasswordWrong);
    }

    return blogUserEntity.toObject();
  }

  public async createUserToken(user: User) {
    const accessTokenPayload = createJWTPayload(user);
    // const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID() };
    // await this.refreshTokenService.createRefreshSession(refreshTokenPayload)
    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      // refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
      //   secret: this.jwtOptions.refreshTokenSecret,
      //   expiresIn: this.jwtOptions.refreshTokenExpiresIn
      // })
    }
  }

  // public async updateAvatar (id:number, avatarId:string){
  //   const blogUser = await this.userInfoRepository.findById(id);
  //   const blogUserEntity = new UserInfoEntity({...blogUser, avatar:avatarId});
  //   return this.userInfoRepository.update(id, blogUserEntity);
  // }

}
