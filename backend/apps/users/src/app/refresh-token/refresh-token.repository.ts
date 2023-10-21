import { Injectable } from '@nestjs/common';
import { RefreshTokenEntity } from './refresh-token.entity';
import { PrismaService } from '../prisma/prisma.service';
import { Token } from '@backend/shared/shared-types';

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: RefreshTokenEntity): Promise<Token> {
    const entityData = item.toObject();
    return this.prisma.refreshToken.create({
      data: {
        ...entityData,
      },
    });
  }

  public async deleteByTokenId(refreshTokenId: number) {
    return this.prisma.refreshToken.delete({
      where: {
        refreshTokenId,
      },
    });
  }

  public async findByTokenId(
    refreshTokenId: string,
  ): Promise<Token | null> {
    return this.prisma.refreshToken.findFirst({
      where: {
        AND:{
          tokenId:refreshTokenId
        }
      },
    });
  }

  public async deleteExpiredTokens() {
    return this.prisma.refreshToken.deleteMany({
      where: {
        expiresIn: { lt: new Date() },
      },
    });
  }
}
