import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsInt, Max, MaxLength, Min, MinLength } from 'class-validator';
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
  @IsEnum(FitnessLevel)
  public fitnessLevel: FitnessLevel;

  @ApiProperty({
    description: 'Type of workout',
    enum: WorkoutType
  })
  @IsEnum(WorkoutType)
  public workoutType: WorkoutType;

  @ApiProperty({
    description: 'Time for workout',
    enum: WorkoutTime
  })
  @IsEnum(WorkoutTime)
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
  public caloriesTotal: number;

  @ApiProperty({
    description: 'Workout description'
  })
  @MinLength(DescriptionLength.Min)
  @MaxLength(DescriptionLength.Max)
  public description: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserSex
  })
  @IsEnum(UserSex)
  public sex: UserSex;

  @ApiProperty({
    description: 'Special offer flag'
  })
  @IsBoolean()
  public isSpecialOffer: boolean;
}

