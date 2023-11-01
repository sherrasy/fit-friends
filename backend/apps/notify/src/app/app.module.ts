import { Module } from '@nestjs/common';
import { ConfigNotifyModule } from '@backend/config-notify';
import { getMongooseOptions } from '@backend/util/util-core';
import { MongooseModule } from '@nestjs/mongoose';
import { DEFAULT_OPTION_SPACE } from './email-subscriber/email-subscriber.constant';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';

@Module({
  imports: [
    ConfigNotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions(DEFAULT_OPTION_SPACE)),
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
