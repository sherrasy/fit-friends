import { EmailSubscriberEntity } from './email-subscriber.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import dayjs from 'dayjs';
import { Subscriber } from '@backend/shared/shared-types';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existsSubscriber = await this.getSubscriber(email);

    if (existsSubscriber) {
      return existsSubscriber;
    }

    const subscriberData = {...subscriber, dateNotify: dayjs().toISOString()}
    return this.emailSubscriberRepository
      .create(new EmailSubscriberEntity(subscriberData));
  }

  public async updateSubscriber(subscriber: UpdateSubscriberDto) {
    const { email, coach } = subscriber;
    const existsSubscriber = await this.getSubscriber(email);

    if (!existsSubscriber) {
throw new NotFoundException ('No subscriber with such email')
    }

    const subscriptionsData = existsSubscriber.subscriptions;

      let updatedList: number[];
      if (!subscriptionsData.includes(coach)) {
        updatedList = subscriptionsData.concat(coach);
      } else {
        updatedList = subscriptionsData.filter((item) => item !== coach);
      }
    const subscriberData = {...existsSubscriber, subscriptions:updatedList}
    const updatedSubscriber = new EmailSubscriberEntity(subscriberData)
    return this.emailSubscriberRepository.update(existsSubscriber.id,updatedSubscriber);
  }

  public async getSubscriber(email:string) {
    return await this.emailSubscriberRepository.findByEmail(email);
  }

  public async updateDateSent(subscriber:Subscriber) {
    const subscriberData = {...subscriber, dateNotify: dayjs().toISOString()}
    const updatedSubscriber = new EmailSubscriberEntity(subscriberData)
    return await this.emailSubscriberRepository.update(subscriber.id, updatedSubscriber);
  }

}
