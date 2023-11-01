import { NotificationsQuery } from '@backend/shared-quieries';
import { BadRequestException, Injectable } from '@nestjs/common';
import { NOTIFICATIONS_ERROR } from './user-notifications.constant';
import { UserNotificationsRepository } from './user-notifications.repository';

@Injectable()
export class UserNotificationsService {
  constructor(
    private readonly notificationsRepository: UserNotificationsRepository
  ) {}

  public async removeNotification(notificationId: number, userId: number) {
    const notificationData = await this.notificationsRepository.findSingle(
      notificationId,
      userId
    );
    if (!notificationData) {
      throw new BadRequestException(NOTIFICATIONS_ERROR);
    }
    return this.notificationsRepository.destroy(notificationData.id);
  }

  public async showNotifications(userId: number, query: NotificationsQuery) {
    return await this.notificationsRepository.show(userId, query);
  }
}
