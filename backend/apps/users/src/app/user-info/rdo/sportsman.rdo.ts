// import { Expose } from 'class-transformer';
// import { ApiProperty } from '@nestjs/swagger';
// import { FitnessLevel, WorkoutTime, WorkoutType } from '@backend/shared/shared-types';
// import { UserRdo } from './user.rdo';

// export class SportsmanRdo extends UserRdo {
//   @ApiProperty({
//     description: 'The level of fitness of the user',
//     enum: FitnessLevel,
//   })
//   @Expose()
//   public fitnessLevel: FitnessLevel;

//   @ApiProperty({
//     description: 'Type of workout',
//     enum: WorkoutType,
//   })
//   @Expose()
//   public workoutType: WorkoutType[];

//   @ApiProperty({
//     description: 'Time for workout',
//     enum: WorkoutTime,
//   })
//   @Expose()
//   public workoutTime: WorkoutTime;

//   @ApiProperty({
//     description: 'Number of calories to reset',
//   })
//   @Expose()
//   public caloriesTotal: number;

//   @ApiProperty({
//     description: 'Number of calories to reset per day',
//   })
//   @Expose()
//   public caloriesPerDay: number;

//   @ApiProperty({
//     description: 'Ready for training flag',
//   })
//   @Expose()
//   isReady: boolean;
// }
