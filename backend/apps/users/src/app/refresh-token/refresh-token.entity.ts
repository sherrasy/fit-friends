import { Entity } from '@backend/util/util-types';
import { Token } from '@backend/shared/shared-types';

export class RefreshTokenEntity implements Entity<RefreshTokenEntity>, Token {
  public createdAt: Date;
  public expiresIn: Date;
  public refreshTokenId: number;
  public tokenId: string;
  public userId: number;

  constructor(refreshToken: Token) {
    this.createdAt = new Date();
    this.fillEntity(refreshToken);
  }

  public fillEntity(entity: Token): void {
    this.userId = entity.userId;
    this.refreshTokenId = entity.refreshTokenId;
    this.tokenId = entity.tokenId;
    this.createdAt = entity.createdAt;
    this.expiresIn = entity.expiresIn;
  }

  public toObject(): RefreshTokenEntity {
    return { ...this };
  }
}
