import { jwtConfig } from '@backend/config/config-users';
import {
  RefreshToken,
  RefreshTokenPayload,
} from '@backend/shared/shared-types';
import { parseTime } from '@backend/util/util-core';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import dayjs from 'dayjs';
import { AuthError } from '../authentication/authentication.constant';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenRepository } from './refresh-token.repository';

@Injectable()
export class RefreshTokenService {
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>
  ) {}

  public async createRefreshSession(payload: RefreshTokenPayload) {
    const timeValue = parseTime(this.jwtOptions.refreshTokenExpiresIn);
    const refreshToken = new RefreshTokenEntity({
      tokenId: payload.tokenId,
      createdAt: new Date(),
      userId: payload.sub,
      expiresIn: dayjs().add(timeValue.value, timeValue.unit).toDate(),
    });

    return this.refreshTokenRepository.create(refreshToken);
  }

  public async deleteRefreshSession(tokenId: number) {
    await this.deleteExpiredRefreshTokens();
    return this.refreshTokenRepository.deleteByTokenId(tokenId);
  }

  public async findToken(tokenId: string): Promise<RefreshToken | null> {
    const refreshToken = await this.refreshTokenRepository.findByTokenId(
      tokenId
    );
    return refreshToken;
  }

  public async deleteTokenByUserId(userId: number) {
    const refreshToken = await this.refreshTokenRepository.findByUserId(userId);
    if (!refreshToken) {
      throw new NotFoundException(AuthError.TokenNotFound);
    }
    return await this.deleteRefreshSession(refreshToken.refreshTokenId);
  }

  public async deleteExpiredRefreshTokens() {
    return this.refreshTokenRepository.deleteExpiredTokens();
  }
}
