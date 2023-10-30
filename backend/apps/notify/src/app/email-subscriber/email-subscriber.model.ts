import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subscriber } from '@backend/shared/shared-types';
import { SUBSCRIBERS_COLLECTION_NAME } from './email-subscriber.constant';


@Schema({
  collection: SUBSCRIBERS_COLLECTION_NAME,
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements  Subscriber {
  @Prop()
  public email: string;

  @Prop()
  public name: string;

  @Prop()
  public dateNotify: string;

  @Prop()
  public subscriptions: number[];
}

export const EmailSubscriberSchema = SchemaFactory.createForClass(EmailSubscriberModel);
