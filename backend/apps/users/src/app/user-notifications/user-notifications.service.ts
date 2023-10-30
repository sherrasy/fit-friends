import { Injectable, BadRequestException } from '@nestjs/common';
import { UserNotificationsRepository } from './user-notifications.repository';
import { UserNotificationEntity } from './user-notification.entity';
import { getDate } from '@backend/util/util-core';
import { CreateNotificationDto } from '@backend/shared/shared-dto';
import { NOTIFICATIONS_ERROR } from './user-notifications.constant';
import { NotificationsQuery } from '@backend/shared-quieries';

@Injectable()
export class UserNotificationsService {
  constructor(
    private readonly notificationsRepository: UserNotificationsRepository,
    ) {}

  public async addNotification(dto:CreateNotificationDto) {
    const notificationEntity = new UserNotificationEntity(dto);
    return this.notificationsRepository.create(notificationEntity);
  }

  public async removeNotification(notificationId: number, userId: number) {
    const notificationData = await this.notificationsRepository.findSingle(notificationId, userId);
    if (!notificationData) {
      throw new BadRequestException (NOTIFICATIONS_ERROR);
    }
    return this.notificationsRepository.destroy(notificationData.id);
  }

  public async showNotifications(userId: number, query:NotificationsQuery) {
        return await this.notificationsRepository.show(userId, query);;
  }
}
