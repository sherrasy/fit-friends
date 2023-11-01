import { getRabbitMQOptions } from '@backend/util/util-core';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { DEFAULT_OPTION_SPACE } from './notify.constant';
import { NotifyService } from './notify.service';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions(DEFAULT_OPTION_SPACE)
    ),
  ],
  providers: [NotifyService],
  exports: [NotifyService],
})
export class NotifyModule {}
