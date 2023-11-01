import { Workout } from '@backend/shared/shared-types';
import { IsArray, IsEmail } from 'class-validator';
import { EmailError } from '../email-subscriber.constant';

export class NewsletterDto {
  @IsEmail({}, { message: EmailError.InvalidEmail })
  public email: string;

  @IsArray()
  public workouts: Workout[];
}
