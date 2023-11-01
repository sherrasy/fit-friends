import { Friend } from "@backend/shared/shared-types";

export class FriendsEntity implements Friend {
  public id?:number;
  public userId: number;
  public friendId: number;
  public createdDate:Date;

  constructor(friend: Friend) {
    this.fillEntity(friend);
  }

  public toObject() {
    return {...this };
  }

  public fillEntity(friend: Friend) {
    this.id = friend.id;
    this.userId = friend.userId;
    this.friendId = friend.friendId;
    this.createdDate = friend.createdDate;
  }
}
