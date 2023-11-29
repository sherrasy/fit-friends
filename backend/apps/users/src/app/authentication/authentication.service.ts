import { jwtConfig } from '@backend/config/config-users';
import { CreateUserDto, LoginUserDto } from '@backend/shared/shared-dto';
import { TokenAuth, User } from '@backend/shared/shared-types';
import { createJWTPayload, getDate } from '@backend/util/util-core';
import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'node:crypto';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { UserInfoEntity } from '../user-info/user-info.entity';
import { UserInfoRepository } from '../user-info/user-info.repository';
import { AuthError } from './authentication.constant';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userInfoRepository: UserInfoRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService
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

    const userEntity = await new UserInfoEntity(user).setPassword(dto.password);

    return this.userInfoRepository.create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.userInfoRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthError.NotFound);
    }

    const userEntity = new UserInfoEntity(existUser);
    if (!(await userEntity.comparePassword(password))) {
      throw new UnauthorizedException(AuthError.PasswordWrong);
    }

    return userEntity.toObject();
  }

  public async createUserToken(user: User, tokenAuth?: TokenAuth) {
    if (
      tokenAuth &&
      tokenAuth.accessToken &&
      tokenAuth.refreshToken &&
      tokenAuth.userId === user._id
    ) {
      return {
        accessToken: tokenAuth.accessToken,
        refreshToken: tokenAuth.refreshToken,
      };
    }
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: crypto.randomUUID(),
    };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);
    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      }),
    };
  }

  public async revokeToken(userId: number) {
    return await this.refreshTokenService.deleteTokenByUserId(userId);
  }

  public async checkEmail(email: string) {
    return await this.userInfoRepository.findByEmail(email);

  }
}
