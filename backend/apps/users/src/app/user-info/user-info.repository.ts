import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepository } from '@backend/util/util-types';
import { UserInfoEntity } from './entity/user-info-entity.type';
import { UserInfo } from '@backend/shared/shared-types';
import { adaptPrismaUser } from '../utils/adapt-prisma-user';

@Injectable()
export class UserInfoRepository
  implements CRUDRepository<UserInfoEntity, number, UserInfo>
{
  constructor(private readonly prisma: PrismaService) {}

  // public async create(item: UserInfoEntity): Promise<UserInfo> {
  // const data ={
  //   ...item.toObject(),
  //   password:item.passwordHash
  // }
  // delete data.passwordHash;
  //   const newUser = await this.prisma.user.create({data});
  // return adaptPrismaUser(newUser);
  // }

  public async findById(id: number): Promise<UserInfo | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    return adaptPrismaUser(user);
  }

  public async findByEmail(email: string): Promise<UserInfo | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    return adaptPrismaUser(user);
  }

  public async show(): Promise<UserInfo[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user)=> adaptPrismaUser(user));
  }

  // public async update(id: number, item: UserInfoEntity): Promise<UserInfo> {
  //   const data ={
  //         ...item.toObject(),
  //         password:item.passwordHash
  //       }
  //       delete data.passwordHash;

  //       const newUser = await this.prisma.user.update({
  //         where: { id },
  //         data
  //       });
  // return adaptPrismaUser(user);
  // }

  public async destroy(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
