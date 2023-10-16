import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { DescriptionLength, EMAIL_ERROR, NameLength, PasswordLength } from '../../constant';
import { Location, UserRole, UserSex } from '@backend/shared/shared-types';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe'
  })
  @IsString()
  @MinLength(NameLength.Min)
  @MaxLength(NameLength.Max)
  public name: string;

  @ApiProperty({
    description: 'Unique user email address',
    example: 'test@test.ru'
  })
  @IsEmail({}, { message: EMAIL_ERROR})
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  @MinLength(PasswordLength.Min)
  @MaxLength(PasswordLength.Max)
  public password: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserSex
  })
  public sex: UserSex;

  @ApiProperty({
    description: 'User role',
    enum: UserRole
  })
  public role: UserRole;

  @ApiProperty({
    description: 'User location',
    enum: Location
  })
  public location: Location;

  @ApiProperty({
    description: 'User description'
  })
  @MinLength(DescriptionLength.Min)
  @MaxLength(DescriptionLength.Max)
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'User birthdate'
  })
  @IsString()
  @IsOptional()
  public birthDate?: string;

}
