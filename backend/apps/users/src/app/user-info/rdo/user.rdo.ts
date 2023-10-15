import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Location, UserRole, UserSex } from '@backend/shared/shared-types';

export class UserRdo {
  @ApiProperty({
    description: 'The unique user ID',
    example: '1'
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'User firstname and lastname',
    example: 'John Doe'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User email',
    example: 'test@test.ru'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserSex
  })
  @Expose()
  public sex: UserSex;

  @ApiProperty({
    description: 'User role',
    enum: UserRole
  })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'User location',
    enum: Location
  })
  @Expose()
  public location: Location;

  @ApiProperty({
    description: 'User description'
  })
  @Expose()
  public description?: string;

  @ApiProperty({
    description: 'User birthdate'
  })
  @Expose()
  public birthDate?: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User photo path',
    example: '/images/user.png'
  })
  @Expose()
  public photo: string;
}
