import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@backend/config/config-users';
import { ConfigType } from '@nestjs/config';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { RabbitRouting } from '@backend/shared/shared-types';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      this.rabbitOptions.exchange,
      RabbitRouting.AddSubscriber,
      { ...dto }
    );
  }

  public async updateSubscriber(dto: UpdateSubscriberDto) {
    return this.rabbitClient.request<UpdateSubscriberDto>(
    { exchange: this.rabbitOptions.exchange,
      routingKey:RabbitRouting.UpdateSubscriber,
      payload:{ ...dto }
    }
    );
  }
}
