import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenPayload } from '@backend/shared/shared-types';
import { jwtConfig } from '@backend/config/config-users';
import { RefreshTokenService } from '../../refresh-token/refresh-token.service';
import { TokenNotExistsException } from '../exceptions/token-not-exists';
import { UserInfoRepository } from '../../user-info/user-info.repository';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly userInfoRepository: UserInfoRepository,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    });
  }

  public async validate(payload: RefreshTokenPayload) {
    if (! await this.refreshTokenService.isExists(parseInt(payload.tokenId))) {
      throw new TokenNotExistsException(payload.tokenId);
    }

    await this.refreshTokenService.deleteRefreshSession(parseInt(payload.tokenId));
    await this.refreshTokenService.deleteExpiredRefreshTokens();
    return this.userInfoRepository.findById(payload.sub);
  }
}
