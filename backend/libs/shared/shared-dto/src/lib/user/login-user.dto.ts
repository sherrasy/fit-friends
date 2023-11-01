import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ErrorMessage, PasswordLength } from '../constant';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'test@test.ru',
  })
  @IsEmail({}, { message: ErrorMessage.Email })
  public email: string;
  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  @MinLength(PasswordLength.Min)
  @MaxLength(PasswordLength.Max)
  public password: string;
}
