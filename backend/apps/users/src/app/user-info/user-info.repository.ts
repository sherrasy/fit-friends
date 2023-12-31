import { UserQuery } from '@backend/shared-quieries';
import {
  PrismaCoach,
  PrismaSportsman,
  User,
} from '@backend/shared/shared-types';
import { DefaultParam } from '@backend/util/util-core';
import { CRUDRepository } from '@backend/util/util-types';
import { Injectable } from '@nestjs/common';
import { FitnessLevel, UserRole } from '@prisma/users/client';
import { PrismaService } from '../prisma/prisma.service';
import { adaptPrismaUser } from '../utils/adapt-prisma-user';
import { adaptUserToPrisma } from '../utils/adapt-user-to-prisma';
import { UserInfoEntity } from './user-info.entity';

@Injectable()
export class UserInfoRepository
  implements CRUDRepository<UserInfoEntity, number, User>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: UserInfoEntity): Promise<User> {
    const userData = adaptUserToPrisma(item);
    const newUser = await this.prisma.user.create({
      data: {
        ...userData,
        sportsmanInfo: item.sportsmanInfo
          ? {
              create: item.sportsmanInfo as PrismaSportsman,
            }
          : undefined,
        coachInfo: item.coachInfo
          ? {
              create: item.coachInfo as PrismaCoach,
            }
          : undefined,
      },
      include: {
        sportsmanInfo: true,
        coachInfo: true,
      },
    });
    return adaptPrismaUser(newUser);
  }

  public async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        userId: id,
      },
      include: {
        sportsmanInfo: true,
        coachInfo: true,
      },
    });
    return adaptPrismaUser(user);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    return adaptPrismaUser(user);
  }

  public async show(id:number, {
    limit,
    page,
    role,
    location,
    fitnessLevel,
    workoutType,
    sortDirection,
    sortBy,
  }: UserQuery): Promise<User[]> {
    const queryParams = {
      where: {
        AND: {
          userId:{not:id},
          role: role as UserRole,
          fitnessLevel: fitnessLevel as FitnessLevel,
          workoutType: undefined,
          location: undefined,
        },
      },
      take: limit,
      skip:
        page > DefaultParam.Amount
          ? limit * (page - DefaultParam.Step)
          : undefined,
      orderBy: [{ [sortBy]: sortDirection }],
      include: {
        sportsmanInfo: true,
        coachInfo: true,
      },
    };
    if (workoutType) {
      queryParams.where.AND.workoutType = { hasEvery: workoutType };
    }
    if (location) {
      queryParams.where.AND.location = { in: location };
    }
    const users = await this.prisma.user.findMany(queryParams);
    return users.map((user) => adaptPrismaUser(user));
  }

  public async update(id: number, item: UserInfoEntity) {
    const userData = adaptUserToPrisma(item);
    const user = await this.prisma.user.update({
      where: { userId: id },

      data: {
        ...userData,
        sportsmanInfo: item.sportsmanInfo
          ? {
              update: item.sportsmanInfo as PrismaSportsman,
            }
          : undefined,
        coachInfo: item.coachInfo
          ? {
              update: item.coachInfo as PrismaCoach,
            }
          : undefined,
      },
      include: {
        sportsmanInfo: true,
        coachInfo: true,
      },
    });
    return adaptPrismaUser(user);
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { userId: id } });
  }
}
