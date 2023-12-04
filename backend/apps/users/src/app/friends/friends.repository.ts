import { Friend, User } from '@backend/shared/shared-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { adaptPrismaUser } from '../utils/adapt-prisma-user';
import { FriendsEntity } from './friends.entity';
import { DefaultQuery } from '@backend/shared-quieries';
import { DefaultParam } from '@backend/util/util-core';

@Injectable()
export class FriendsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: FriendsEntity): Promise<Friend> {
    const data = { ...item.toObject() };
    delete data.id;
    return await this.prisma.friend.create({ data });
  }

  public async findSingleById(
    friendId: number,
    userId: number
  ): Promise<Friend | null> {
    return await this.prisma.friend.findFirst({
      where: {
        friendId,
        userId,
      },
    });
  }

  public async findAllByUserId(userId: number, {limit, page, sortBy, sortDirection}:DefaultQuery ): Promise<User[] | null> {
    const queryParams = {
      where: {
        userId,
      },
      take: limit,
      skip:
        page > DefaultParam.Amount
          ? limit * (page - DefaultParam.Step)
          : undefined,
      orderBy: [{ [sortBy]: sortDirection }],
      include: {
        friend: {
          include:{
            sportsmanInfo:true,
            coachInfo:true,
          }},
      },
      };

    const data = await this.prisma.friend.findMany(queryParams);
    return data.map((item) => {
      return adaptPrismaUser(item.friend);
    });
  }

  public async findAllByCoachId(friendId: number, {limit, page, sortBy, sortDirection}:DefaultQuery): Promise<User[] | null> {
    const queryParams = {
      where: {
        friendId,
      },
      take: limit,
      skip:
        page > DefaultParam.Amount
          ? limit * (page - DefaultParam.Step)
          : undefined,
      orderBy: [{ [sortBy]: sortDirection }],
      include: {
        user: {
          include:{
            sportsmanInfo:true,
            coachInfo:true,
          }},
      },
      };
    const data = await this.prisma.friend.findMany(queryParams);
    return data.map((item) => {
      return adaptPrismaUser(item.user);
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.friend.delete({ where: { id } });
  }
}
