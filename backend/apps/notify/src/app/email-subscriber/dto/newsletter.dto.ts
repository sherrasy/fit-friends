import {  IsArray, IsEmail, IsString } from 'class-validator';
import { EmailError} from '../email-subscriber.constant';
import { Workout } from '@backend/shared/shared-types';

export class NewsletterDto {
  @IsEmail({}, { message: EmailError.InvalidEmail })
  public email: string;

  @IsArray()
  public workouts: Workout[];
}
