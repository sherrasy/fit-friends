import { Subscriber } from '@backend/shared/shared-types';
import { Entity } from '@backend/util/util-types';

export class EmailSubscriberEntity
  implements Entity<EmailSubscriberEntity>, Subscriber
{
  public id: string;
  public email: string;
  public name: string;
  public dateNotify: string;
  public subscriptions: number[];

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity: Subscriber) {
    this.email = entity.email;
    this.name = entity.name;
    this.id = entity.id;
    this.dateNotify = entity.dateNotify;
    this.subscriptions = entity.subscriptions;
  }

  public toObject(): EmailSubscriberEntity {
    return { ...this };
  }
}
