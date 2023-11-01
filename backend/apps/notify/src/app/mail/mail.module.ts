import { getMailerAsyncOptions } from '@backend/util/util-core';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { DEFAULT_OPTION_SPACE } from './mail.constant';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerAsyncOptions(DEFAULT_OPTION_SPACE)),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
