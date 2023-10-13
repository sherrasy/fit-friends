import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CaloriesAmount, DescriptionLength, NameLength } from "../constant";
import {FitnessLevel, UserSex, WorkoutTime, WorkoutType} from '@backend/shared/shared-types'

export class CreateWorkoutDto  {
  @ApiProperty({
    description: 'Workout name'
  })
  @MinLength(NameLength.Min)
  @MaxLength(NameLength.Min)
  public name: string;

  @ApiProperty({
    description: 'The level of fitness of the user',
    enum: FitnessLevel,
  })
  public fitnessLevel: FitnessLevel;

  @ApiProperty({
    description: 'Type of workout',
    enum: WorkoutTime
  })
  public workoutType: WorkoutType;

  @ApiProperty({
    description: 'Time for workout',
    enum: WorkoutTime
  })
  public workoutTime: WorkoutTime;

  @ApiProperty({
    description: 'The cost of workout'
  })
  @IsInt()
  public price: number;

  @ApiProperty({
    description: 'Number of calories to reset'
  })
  @IsInt()
  @Min(CaloriesAmount.Min)
  @Max(CaloriesAmount.Max)
  public calories: number;

  @ApiProperty({
    description: 'Workout description'
  })
  @MinLength(DescriptionLength.Min)
  @MaxLength(DescriptionLength.Max)
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserSex
  })
  public sex: UserSex;

  @ApiProperty({
    description: 'Special offer flag'
  })
  public isSpecialOffer: boolean;
}

