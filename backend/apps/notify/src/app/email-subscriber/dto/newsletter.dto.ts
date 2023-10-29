import {  IsEmail, IsString } from 'class-validator';
import { EmailError} from '../email-subscriber.constant';

export class NewsletterDto {
  @IsEmail({}, { message: EmailError.InvalidEmail })
  public email: string;

  @IsString()
  public id: string;

}
