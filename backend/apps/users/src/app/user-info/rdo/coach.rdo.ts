// import { Expose } from 'class-transformer';
// import { ApiProperty } from '@nestjs/swagger';
// import { FitnessLevel, WorkoutType } from '@backend/shared/shared-types';
// import { UserRdo } from './user.rdo';

// export class CoachRdo extends UserRdo {
//   @ApiProperty({
//     description: 'The level of fitness of the user',
//     enum: FitnessLevel,
//   })
//   @Expose()
//   public fitnessLevel: FitnessLevel;

//   @ApiProperty({
//     description: 'Type of workout',
//     enum: WorkoutType
//   })
//   @Expose()
//   public workoutType: WorkoutType[];

//   @ApiProperty({
//     description: 'Success description'
//   })
//   @Expose()
//   successInfo?: string;

//   @ApiProperty({
//     description: 'Coach certificate path',
//     example: '/images/user.png'  })
//   @Expose()
//   certificate?: string;

//   @ApiProperty({
//     description: 'Open for personal training flag',
//   })
//   @Expose()
//   isPersonal: boolean;
// }
