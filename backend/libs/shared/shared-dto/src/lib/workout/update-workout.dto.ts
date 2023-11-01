import {
  FitnessLevel,
  UserSex,
  WorkoutTime,
  WorkoutType,
} from '@backend/shared/shared-types';
import { WORKOUT_TYPE_AMOUNT } from '@backend/util/util-core';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { CaloriesAmount, DescriptionLength, NameLength } from '../constant';

export class UpdateWorkoutDto {
  @ApiProperty({
    description: 'Workout name',
  })
  @MinLength(NameLength.Min)
  @MaxLength(NameLength.Max)
  @IsOptional()
  public name?: string;

  @ApiProperty({
    description: 'The level of fitness of the user',
    enum: FitnessLevel,
  })
  @IsOptional()
  @IsEnum(FitnessLevel)
  public fitnessLevel?: FitnessLevel;

  @ApiProperty({
    description: 'Type of workout',
    enum: WorkoutType,
  })
  @IsOptional()
  @ArrayMaxSize(WORKOUT_TYPE_AMOUNT)
  public workoutType?: WorkoutType[];

  @ApiProperty({
    description: 'Time for workout',
    enum: WorkoutTime,
  })
  @IsOptional()
  @IsEnum(WorkoutTime)
  public workoutTime?: WorkoutTime;

  @ApiProperty({
    description: 'The cost of workout',
  })
  @IsInt()
  @IsOptional()
  public price?: number;

  @ApiProperty({
    description: 'Number of calories to reset',
  })
  @IsInt()
  @Min(CaloriesAmount.Min)
  @Max(CaloriesAmount.Max)
  @IsOptional()
  public calories?: number;

  @ApiProperty({
    description: 'Workout description',
  })
  @MinLength(DescriptionLength.Min)
  @MaxLength(DescriptionLength.Max)
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserSex,
  })
  @IsEnum(UserSex)
  @IsOptional()
  public sex?: UserSex;

  @ApiProperty({
    description: 'Special offer flag',
  })
  @IsBoolean()
  @IsOptional()
  public isSpecialOffer?: boolean;
}
