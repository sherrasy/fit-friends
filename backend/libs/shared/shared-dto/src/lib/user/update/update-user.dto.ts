import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsEnum, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { DescriptionLength, NameLength} from '../../constant';
import { FitnessLevel, Location, UserRole, UserSex } from '@backend/shared/shared-types';
import { Type } from 'class-transformer';
import { UpdateSportsmanDto } from './update-sportsman.dto';
import { UpdateCoachDto } from './update-coach.dto';
import { WorkoutType } from '@prisma/client';
import { WORKOUT_TYPE_AMOUNT } from '@backend/util/util-core';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe'
  })
  @IsString()
  @MinLength(NameLength.Min)
  @MaxLength(NameLength.Max)
  @IsOptional()
  public name?: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserSex
  })
  @IsOptional()
  public sex?: UserSex;

  @ApiProperty({
    description: 'User location',
    enum: Location
  })
  @IsOptional()
  public location?: Location;

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
    description: 'User role',
    enum: UserRole
  })
  public role: UserRole;

  @ApiProperty({
    description: 'The level of fitness of the user',
    enum: FitnessLevel,
  })
  @IsEnum(FitnessLevel)
  @IsOptional()
  public fitnessLevel?: FitnessLevel;

  @ApiProperty({
    description: 'Type of workout',
    enum: WorkoutType
  })
  @ArrayMaxSize(WORKOUT_TYPE_AMOUNT)
  @IsOptional()
  public workoutType?: WorkoutType[];


  @ApiProperty({
    description: 'User sportsman info'
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateSportsmanDto)
  public sportsmanInfo?: UpdateSportsmanDto;

  @ApiProperty({
    description: 'User coach info'
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateCoachDto)
  public coachInfo?: UpdateCoachDto;

}
