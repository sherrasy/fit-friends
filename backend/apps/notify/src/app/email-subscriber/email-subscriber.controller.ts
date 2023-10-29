import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@backend/shared/shared-types';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { MailService } from '../mail/mail.service';

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


}
