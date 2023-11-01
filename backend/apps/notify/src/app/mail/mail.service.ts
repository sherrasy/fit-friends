import { Subscriber, Workout } from '@backend/shared/shared-types';
import { Injectable, Inject } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { notifyConfig } from '@backend/config-notify';
import { ConfigType } from '@nestjs/config';
import { EmailSubject } from './mail.constant';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(notifyConfig.KEY)
    private readonly serviceConfig:ConfigType<typeof notifyConfig>,
    ) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: subscriber.email,
      subject: EmailSubject.AddSubscriber,
      template: './add-subscriber',
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      }
    })
  }

  public async sendWorkouts(email: string, workoutsInfo:Workout[]) {
    await this.mailerService.sendMail({
      from: this.serviceConfig.mail.from,
      to: email,
      subject: EmailSubject.Newsletter,
      template: './newsletter-workouts',
      context: {
      workouts:workoutsInfo
      }
    })
}
}
