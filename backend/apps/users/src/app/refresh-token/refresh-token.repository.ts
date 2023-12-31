import { Token } from '@backend/shared/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RefreshTokenEntity } from './refresh-token.entity';

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

  public async findByTokenId(refreshTokenId: string): Promise<Token | null> {
    return this.prisma.refreshToken.findFirst({
      where: {
        AND: {
          tokenId: refreshTokenId,
        },
      },
    });
  }

  public async findByUserId(userId: number): Promise<Token | null> {
    return this.prisma.refreshToken.findFirst({
      where: {
        AND: {
          userId,
        },
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
