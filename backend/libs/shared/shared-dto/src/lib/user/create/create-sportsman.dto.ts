import {
  FitnessLevel,
  WorkoutTime,
  WorkoutType,
} from '@backend/shared/shared-types';
import { WORKOUT_TYPE_AMOUNT } from '@backend/util-core';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  IsBoolean,
  IsEnum,
  IsInt,
  Max,
  Min,
} from 'class-validator';
import { CaloriesAmount } from '../../constant';

export class CreateSportsmanDto extends CreateUserDto {
  @ApiProperty({
    description: 'The level of fitness of the user',
    enum: FitnessLevel,
  })
  @IsEnum(WorkoutType)
  public fitnessLevel: FitnessLevel;

  @ApiProperty({
    description: 'Type of workout',
    enum: WorkoutType,
  })
  @ArrayMaxSize(WORKOUT_TYPE_AMOUNT)
  public workoutType: WorkoutType[];

  @ApiProperty({
    description: 'Time for workout',
    enum: WorkoutTime,
  })
  @IsEnum(WorkoutTime)
  public workoutTime: WorkoutTime;

  @ApiProperty({
    description: 'Number of calories to reset',
  })
  @IsInt()
  @Min(CaloriesAmount.Min)
  @Max(CaloriesAmount.Max)
  public caloriesTotal: number;

  @ApiProperty({
    description: 'Number of calories to reset per day',
  })
  @IsInt()
  @Min(CaloriesAmount.Min)
  @Max(CaloriesAmount.Max)
  public caloriesPerDay: number;

  @ApiProperty({
    description: 'Ready for training flag',
  })
  @IsBoolean()
  isReady: boolean;
}
