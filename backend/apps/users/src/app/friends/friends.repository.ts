import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FriendsEntity } from './friends.entity';
import { Friend } from '@backend/shared/shared-types';
import { adaptPrismaUser } from '../utils/adapt-prisma-user';

@Injectable()
export class FriendsRepository  {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: FriendsEntity): Promise<Friend> {
    const data = {...item.toObject()};
  return await this.prisma.friend.create({data })
  }

  public async findSingleById(friendId: number, userId:number): Promise<Friend | null> {
    return await this.prisma.friend.findFirst({
      where: {
        friendId,
        userId
      }
    });
  }

  public async findAllByUserId(userId: number): Promise<Friend[] | null> {
    const data = await this.prisma.friend.findMany({
      where: {
        userId
      },
      include:{
        friend:true
      }
    });
    return data.map((item)=>{return {...item, info: adaptPrismaUser(item.friend) }})
  }

  public async findAllByCoachId(friendId: number): Promise<Friend[] | null> {
    return await this.prisma.friend.findMany({
      where: {
        friendId
      },
      include:{
        user:true,
      }
    });
  }


  public async destroy(id: number): Promise<void> {
    await this.prisma.friend.delete({ where: {id} });
  }

}
