import { getRabbitMQOptions } from '@backend/util/util-core';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from '../mail/mail.module';
import { EmailSubscriberController } from './email-subscriber.controller';
import {
  EmailSubscriberModel,
  EmailSubscriberSchema,
} from './email-subscriber.model';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { EmailSubscriberService } from './email-subscriber.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EmailSubscriberModel.name, schema: EmailSubscriberSchema },
    ]),
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('application.rabbit')
    ),
    MailModule,
  ],
  controllers: [EmailSubscriberController],
  providers: [
    EmailSubscriberService,
    EmailSubscriberRepository,
    EmailSubscriberController,
  ],
})
export class EmailSubscriberModule {}
