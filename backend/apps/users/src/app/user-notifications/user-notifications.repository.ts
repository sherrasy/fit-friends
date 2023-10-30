import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DefaultParam } from '@backend/util/util-core';
import { UserNotificationEntity } from './user-notification.entity';
import { UserNotification } from '@backend/shared/shared-types';
import { NotificationsQuery } from '@backend/shared-quieries';

@Injectable()
export class UserNotificationsRepository{
  constructor(private readonly prisma: PrismaService) { }

  public async create(item:UserNotificationEntity ): Promise<UserNotification> {
    const data = {...item.toObject()};
    return await this.prisma.notification.create({ data });
  }

  public async findSingle(id: number, userId:number): Promise<UserNotification | null> {
    return await this.prisma.notification.findFirst({
      where: {
        id,
        userId,
      },

    });
  }

  public async show(userId:number, { limit, page, sortDirection, sortBy }: NotificationsQuery): Promise<UserNotification[]> {
    const queryParams = {
      where:{
        userId
      },
      take: limit,
      skip: page > DefaultParam.Amount ? limit * (page - DefaultParam.Step) : undefined,
      orderBy: [{ [sortBy]: sortDirection }],
    }
    const notifications = await this.prisma.notification.findMany(queryParams);
    return notifications;
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.notification.delete({ where: { id } });
  }
}
