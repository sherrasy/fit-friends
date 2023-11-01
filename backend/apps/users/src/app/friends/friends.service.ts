import { NotificationText, UserRole } from '@backend/shared/shared-types';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserNotificationsRepository } from '../user-notifications/user-notifications.repository';
import { FriendsError } from './friends.constant';
import { FriendsEntity } from './friends.entity';
import { FriendsRepository } from './friends.repository';

@Injectable()
export class FriendsService {
  constructor(
    private readonly friendsRepository: FriendsRepository,
    private readonly notificationRepository: UserNotificationsRepository
  ) {}

  public async addFriend(friendId: number, userId: number) {
    const friendData = await this.friendsRepository.findSingleById(
      friendId,
      userId
    );
    if (friendData) {
      throw new BadRequestException(FriendsError.AlreadyAdded);
    }
    const friend = { userId, friendId };
    const friendEntity = new FriendsEntity(friend);
    const friendInfo = await this.friendsRepository.create(friendEntity);
    const notification = { userId: friendId, text: NotificationText.Friend };
    await this.notificationRepository.create(notification);
    return friendInfo;
  }

  public async removeFriend(friendId: number, userId: number) {
    const friendData = await this.friendsRepository.findSingleById(
      friendId,
      userId
    );
    if (!friendData) {
      throw new BadRequestException(FriendsError.NotFound);
    }
    return this.friendsRepository.destroy(friendData.id);
  }

  public async showFriends(userId: number, role: string) {
    const friendsList =
      role === UserRole.Sportsman
        ? await this.friendsRepository.findAllByUserId(userId)
        : await this.friendsRepository.findAllByCoachId(userId);
    return friendsList;
  }
}
