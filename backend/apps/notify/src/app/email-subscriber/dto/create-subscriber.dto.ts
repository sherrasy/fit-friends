import { IsEmail, IsNotEmpty } from 'class-validator';
import { EmailError} from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EmailError.InvalidEmail })
  public email: string;

  @IsNotEmpty({ message: EmailError.EmptyName })
  public name: string;

}
