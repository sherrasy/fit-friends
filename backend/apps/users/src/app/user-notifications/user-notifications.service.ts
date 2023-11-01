import { Injectable, BadRequestException } from '@nestjs/common';
import { UserNotificationsRepository } from './user-notifications.repository';
import { NOTIFICATIONS_ERROR } from './user-notifications.constant';
import { NotificationsQuery } from '@backend/shared-quieries';

@Injectable()
export class UserNotificationsService {
  constructor(
    private readonly notificationsRepository: UserNotificationsRepository,
    ) {}

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
