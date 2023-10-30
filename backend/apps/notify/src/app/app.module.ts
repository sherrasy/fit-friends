import { Module } from '@nestjs/common';

import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { ConfigNotifyModule } from '@backend/config-notify';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongooseOptions } from '@backend/util/util-core';
import { DEFAULT_OPTION_SPACE } from './email-subscriber/email-subscriber.constant';

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
