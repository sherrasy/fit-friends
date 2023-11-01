import { RabbitRouting } from '@backend/shared/shared-types';
import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { NewsletterDto } from './dto/newsletter.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { getNewWorkouts } from './utils/get-new-workouts';
import {
  EXCHANGE_NAME,
  QueueName,
  SUBSCRIBERS_COLLECTION_NAME,
} from './email-subscriber.constant';
import { DefaultParam } from '@backend/util/util-core';

@Controller(SUBSCRIBERS_COLLECTION_NAME)
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService
  ) {}

  @RabbitSubscribe({
    exchange: EXCHANGE_NAME,
    routingKey: RabbitRouting.AddSubscriber,
    queue: QueueName.AddSubscriber,
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitRPC({
    exchange: EXCHANGE_NAME,
    routingKey: RabbitRouting.UpdateSubscriber,
    queue: QueueName.UpdateSubscriber,
  })
  public async update(subscriber: UpdateSubscriberDto) {
    this.subscriberService.updateSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: EXCHANGE_NAME,
    routingKey: RabbitRouting.SendWorkouts,
    queue: QueueName.SendWorkouts,
  })
  public async sendNewsletter(dto: NewsletterDto) {
    const { email, workouts } = dto;
    const recipient = await this.subscriberService.getSubscriber(email);
    if (recipient && workouts.length > DefaultParam.Amount) {
      const newWorkouts = getNewWorkouts(dto, recipient);
      if (newWorkouts.length > DefaultParam.Amount) {
        await this.mailService.sendWorkouts(recipient.email, newWorkouts);
        this.subscriberService.updateDateSent(recipient);
      }
    }
  }
}
