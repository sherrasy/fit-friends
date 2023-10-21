import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { DescriptionLength, EMAIL_ERROR, NameLength, PasswordLength } from '../../constant';
import { FitnessLevel, Location, UserRole, UserSex, WorkoutType } from '@backend/shared/shared-types';
import { CreateCoachDto } from './create-coach.dto';
import { Type } from 'class-transformer';
import { CreateSportsmanDto } from './create-sportsman.dto';
import { WORKOUT_TYPE_AMOUNT } from '@backend/util/util-core';

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
  @IsEnum(UserSex)
  public sex: UserSex;

  @ApiProperty({
    description: 'User role',
    enum: UserRole
  })
  @IsEnum(UserRole)
  public role: UserRole;

  @ApiProperty({
    description: 'User location',
    enum: Location
  })
  @IsEnum(Location)
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

  @ApiProperty({
    description: 'The level of fitness of the user',
    enum: FitnessLevel,
  })
  @IsEnum(FitnessLevel)
  public fitnessLevel: FitnessLevel;

  @ApiProperty({
    description: 'Type of workout',
    enum: WorkoutType,
  })
  @ArrayMaxSize(WORKOUT_TYPE_AMOUNT)
  public workoutType: WorkoutType[];


  @ApiProperty({
    description: 'User sportsman info'
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => CreateSportsmanDto)
  public sportsmanInfo?: CreateSportsmanDto;

  @ApiProperty({
    description: 'User coach info'
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => CreateCoachDto)
  public coachInfo?: CreateCoachDto;

}
