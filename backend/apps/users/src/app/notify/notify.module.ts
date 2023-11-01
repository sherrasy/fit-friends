import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@backend/util/util-core';
import { DEFAULT_OPTION_SPACE } from './notify.constant';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions(DEFAULT_OPTION_SPACE)
    )
  ],
  providers: [NotifyService],
  exports: [NotifyService]
})
export class NotifyModule {}
