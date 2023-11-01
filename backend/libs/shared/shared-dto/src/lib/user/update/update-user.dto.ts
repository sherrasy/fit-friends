import {
  FitnessLevel,
  Location,
  UserSex,
  WorkoutType,
} from '@backend/shared/shared-types';
import { WORKOUT_TYPE_AMOUNT } from '@backend/util/util-core';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import {
  DescriptionLength,
  ErrorMessage,
  NameLength,
  USERNAME_PATTERN,
} from '../../constant';
import { UpdateCoachDto } from './update-coach.dto';
import { UpdateSportsmanDto } from './update-sportsman.dto';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  @IsString()
  @MinLength(NameLength.Min)
  @MaxLength(NameLength.Max)
  @Matches(USERNAME_PATTERN, { message: ErrorMessage.Name })
  @IsOptional()
  public name?: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserSex,
  })
  @IsOptional()
  @IsEnum(UserSex)
  public sex?: UserSex;

  @ApiProperty({
    description: 'User location',
    enum: Location,
  })
  @IsOptional()
  @IsEnum(Location)
  public location?: Location;

  @ApiProperty({
    description: 'User description',
  })
  @MinLength(DescriptionLength.Min)
  @MaxLength(DescriptionLength.Max)
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'User birthdate',
  })
  @IsString()
  @IsOptional()
  public birthDate?: string;

  @ApiProperty({
    description: 'The level of fitness of the user',
    enum: FitnessLevel,
  })
  @IsEnum(FitnessLevel)
  @IsOptional()
  public fitnessLevel?: FitnessLevel;

  @ApiProperty({
    description: 'Type of workout',
    enum: WorkoutType,
  })
  @ArrayMaxSize(WORKOUT_TYPE_AMOUNT)
  @IsOptional()
  public workoutType?: WorkoutType[];

  @ApiProperty({
    description: 'User sportsman info',
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateSportsmanDto)
  public sportsmanInfo?: UpdateSportsmanDto;

  @ApiProperty({
    description: 'User coach info',
  })
  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateCoachDto)
  public coachInfo?: UpdateCoachDto;
}
