import {
  FitnessLevel,
  UserSex,
  WorkoutTime,
  WorkoutType,
} from '@backend/shared/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class WorkoutRdo {
  @ApiProperty({
    description: 'Unique workout  ID',
    example: '1',
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Coach  id',
    example: '1',
  })
  @Expose()
  public coachId: number;

  @ApiProperty({
    description: 'Workout name',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'The level of fitness of the user',
    enum: FitnessLevel,
  })
  @Expose()
  public fitnessLevel: FitnessLevel;

  @ApiProperty({
    description: 'Type of workout',
    enum: WorkoutType,
  })
  @Expose()
  public workoutType: WorkoutType;

  @ApiProperty({
    description: 'Time for workout',
    enum: WorkoutTime,
  })
  @Expose()
  public workoutTime: WorkoutTime;

  @ApiProperty({
    description: 'The cost of workout',
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Number of calories to reset',
  })
  @Expose()
  public calories: number;

  @ApiProperty({
    description: 'Workout description',
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Workout photo',
  })
  @Expose()
  public photo: string;
  @ApiProperty({
    description: 'Workout video',
  })
  @Expose()
  public video: string;
  @ApiProperty({
    description: 'Workout rating',
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'User gender',
    enum: UserSex,
  })
  @Expose()
  public sex: UserSex;

  @ApiProperty({
    description: 'Special offer flag',
  })
  @Expose()
  public isSpecialOffer: boolean;
}
