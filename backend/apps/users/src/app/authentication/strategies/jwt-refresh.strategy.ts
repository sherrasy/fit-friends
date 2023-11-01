import { jwtConfig } from '@backend/config/config-users';
import { RefreshTokenPayload } from '@backend/shared/shared-types';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RefreshTokenService } from '../../refresh-token/refresh-token.service';
import { UserInfoRepository } from '../../user-info/user-info.repository';
import { TokenNotExistsException } from '../exceptions/token-not-exists';

const STRATEGY_NAME = 'jwt-refresh';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  STRATEGY_NAME
) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly userInfoRepository: UserInfoRepository,
    private readonly refreshTokenService: RefreshTokenService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    });
  }

  public async validate(payload: RefreshTokenPayload) {
    const token = await this.refreshTokenService.findToken(payload.tokenId);
    if (!token) {
      throw new TokenNotExistsException(payload.tokenId);
    }
    await this.refreshTokenService.deleteRefreshSession(token.refreshTokenId);
    await this.refreshTokenService.deleteExpiredRefreshTokens();
    return this.userInfoRepository.findById(payload.sub);
  }
}
