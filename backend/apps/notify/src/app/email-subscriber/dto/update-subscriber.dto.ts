import {  IsEmail, IsInt } from 'class-validator';
import { EmailError} from '../email-subscriber.constant';

export class UpdateSubscriberDto {
  @IsEmail({}, { message: EmailError.InvalidEmail })
  public email: string;

  @IsInt()
  coach:number
}
