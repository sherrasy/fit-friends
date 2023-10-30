import { UserNotification } from "@backend/shared/shared-types";

export class UserNotificationEntity implements UserNotification {
  public id?:number;
  public userId: number;
  public text: string;
  public createdDate:Date;

  constructor(notification: UserNotification) {
    this.fillEntity(notification);
  }

  public toObject() {
    return {...this };
  }

  public fillEntity(notification: UserNotification) {
    this.id = notification.id;
    this.userId = notification.userId;
    this.text = notification.text;
    this.createdDate = notification.createdDate;
  }
}
