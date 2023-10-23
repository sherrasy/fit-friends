import { ApiProperty } from "@nestjs/swagger";
import {FitnessLevel, UserSex, WorkoutTime, WorkoutType} from '@backend/shared/shared-types'
import { Expose } from 'class-transformer';

export class WorkoutRdo  {
  @ApiProperty({
    description: 'Unique workout  ID',
    example: '1'
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Coach  id',
    example: '1'
  })
  @Expose()
  public coachId: number;

  @ApiProperty({
    description: 'Workout name'
  })
  public name: string;

  @ApiProperty({
    description: 'The level of fitness of the user',
    enum: FitnessLevel,
  })
  public fitnessLevel: FitnessLevel;

  @ApiProperty({
    description: 'Type of workout',
    enum: WorkoutType
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
  public price: number;

  @ApiProperty({
    description: 'Number of calories to reset'
  })
  public caloriesTotal: number;

  @ApiProperty({
    description: 'Workout description'
  })
  public description: string;

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

