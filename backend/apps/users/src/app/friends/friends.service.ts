import { BadRequestException, Injectable } from '@nestjs/common';
import { FriendsRepository } from './friends.repository';
import { FriendsEntity } from './friends.entity';
import { FriendsError } from './friends.constant';
import { UserRole } from '@backend/shared/shared-types';

@Injectable()
export class FriendsService {
  constructor(private readonly friendsRepository: FriendsRepository) {}

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
    return this.friendsRepository.create(friendEntity);
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
    const friendsList = role === UserRole.Sportsman
        ? await this.friendsRepository.findAllByUserId(userId)
        : await this.friendsRepository.findAllByCoachId(userId);
    return friendsList;
  }
}
