import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepository } from '@backend/util/util-types';
import { adaptPrismaUser } from '../utils/adapt-prisma-user';
import { UserQuery } from '@backend/shared-quieries';
import { FitnessLevel, UserRole } from '@prisma/client';
import { User } from '@backend/shared/shared-types';
import { UserInfoEntity } from './user-info.entity';

@Injectable()
export class UserInfoRepository
  implements CRUDRepository<UserInfoEntity, number, User>
{
  constructor(private readonly prisma: PrismaService) {}

  // public async create(item: UserInfoEntity): Promise<UserInfo> {
  // const data ={
  //   ...item.toObject(),
  //   password:item.passwordHash
  // }
  // delete data._id;
  // delete data.passwordHash;
  // const newUser = await this.prisma.user.create({ data } );
  // return adaptPrismaUser(newUser);
  // }

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

  // public async findByEmail(email: string): Promise<UserInfo | null> {
  //   const user = await this.prisma.user.findFirst({
  //     where: {
  //       email,
  //     },
  //   });
  //   return adaptPrismaUser(user);
  // }

  // public async show({limit, page, role, location, fitnessLevel, workoutType}:UserQuery): Promise<UserInfo[]> {
  //   const queryParams = {
  //     where: {
  //       AND: {
  //         role: role as UserRole,
  //         fitnessLevel: fitnessLevel as FitnessLevel,
  //         workoutType: undefined,
  //         location: undefined,
  //       }
  //     },
  //     take: limit,
  //     skip: page > 0 ? limit * (page - 1) : undefined,
  //   }
  //   if (workoutType) {
  //     queryParams.where.AND.workoutType = { hasSome: workoutType };
  //   }
  //   if (location) {
  //     queryParams.where.AND.location = { in: location };
  //   }
  //   const users = await this.prisma.user.findMany(queryParams);
  //   return users.map((user)=> adaptPrismaUser(user));
  // }

  // public async update(id: number, item: UserInfoEntity): Promise<UserInfo> {
  //   const data ={
  //         ...item.toObject(),
  //         password:item.passwordHash
  //       }
  //       delete data.passwordHash;

  //       const user = await this.prisma.user.update({
  //         where: { userId:id },
  //         data
  //       });
  // return adaptPrismaUser(user);
  // }

  public async destroy(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { userId: id } });
  }
}
