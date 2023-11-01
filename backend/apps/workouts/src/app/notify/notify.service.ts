import { rabbitConfig } from '@backend/config/config-workouts';
import { RabbitRouting } from '@backend/shared/shared-types';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SendNewsletterWorkoutsDto } from './dto/send-newsletter.dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>
  ) {}

  public async sendNewsletter(dto: SendNewsletterWorkoutsDto) {
    return this.rabbitClient.publish<SendNewsletterWorkoutsDto>(
      this.rabbitOptions.exchange,
      RabbitRouting.SendWorkouts,
      { ...dto }
    );
  }
}
