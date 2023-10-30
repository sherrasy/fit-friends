import { RabbitRouting } from '@backend/shared/shared-types';
import { Inject, Injectable } from '@nestjs/common';
import { SendNewsletterWorkoutsDto } from './dto/send-newsletter.dto';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';
import { rabbitConfig } from '@backend/config/config-workouts';

@Injectable()
export class NotifyService {
constructor(
  private readonly rabbitClient: AmqpConnection,
  @Inject(rabbitConfig.KEY)
  private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
) { }

public async sendNewsletter(dto: SendNewsletterWorkoutsDto) {
  return this.rabbitClient.publish<SendNewsletterWorkoutsDto>(
    this.rabbitOptions.exchange,
    RabbitRouting.SendWorkouts,
    { ...dto }
  );
}
}
