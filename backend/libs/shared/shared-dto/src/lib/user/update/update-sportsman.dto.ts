import {
  FitnessLevel,
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
  Min,
} from 'class-validator';
import { CaloriesAmount } from '../../constant';

export class UpdateSportsmanDto {
  @ApiProperty({
    description: 'The level of fitness of the user',
    enum: FitnessLevel,
  })
  @IsEnum(WorkoutType)
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
    description: 'Time for workout',
    enum: WorkoutTime,
  })
  @IsEnum(WorkoutTime)
  @IsOptional()
  public workoutTime?: WorkoutTime;

  @ApiProperty({
    description: 'Number of calories to reset',
  })
  @IsInt()
  @Min(CaloriesAmount.Min)
  @Max(CaloriesAmount.Max)
  @IsOptional()
  public caloriesTotal?: number;

  @ApiProperty({
    description: 'Number of calories to reset per day',
  })
  @IsInt()
  @Min(CaloriesAmount.Min)
  @Max(CaloriesAmount.Max)
  @IsOptional()
  public caloriesPerDay?: number;

  @ApiProperty({
    description: 'Ready for workout flag',
  })
  @IsBoolean()
  @IsOptional()
  public isReady?: boolean;
}
