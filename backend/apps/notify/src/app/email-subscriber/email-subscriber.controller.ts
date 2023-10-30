import { Controller } from '@nestjs/common';
import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@backend/shared/shared-types';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { MailService } from '../mail/mail.service';
import { NewsletterDto } from './dto/newsletter.dto';
import { getNewWorkouts } from './utils/get-new-workouts';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';

@Controller('email-subscriber')
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService
  ) {}

  @RabbitSubscribe({
    exchange: 'fit-friends.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'fit-friends.notify.subscriber',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitRPC({
    exchange: 'fit-friends.notify',
    routingKey: RabbitRouting.UpdateSubscriber,
    queue: 'fit-friends.notify.subscriber-upload',
  })
  public async update(subscriber: UpdateSubscriberDto) {
    this.subscriberService.updateSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'fit-friends.notify',
    routingKey: RabbitRouting.SendWorkouts,
    queue: 'fit-friends.notify.newsletter',
  })
  public async sendNewsletter(dto: NewsletterDto) {
    const { email, workouts } = dto;
    const recipient = await this.subscriberService.getSubscriber(email);
    if (recipient && workouts.length > 0) {
      const newPosts = getNewWorkouts(dto, recipient);
      if (newPosts.length > 0) {
        await this.mailService.sendWorkouts(recipient.email, newPosts);
        this.subscriberService.updateDateSent(recipient);
      }
    }
  }

}
