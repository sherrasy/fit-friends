import { FitnessLevel } from '@frontend-types/common/fitness-level.enum';
import { UserSex } from '@frontend-types/common/user-sex.enum';
import { WorkoutTime } from '@frontend-types/common/workout-time.enum';
import { WorkoutType } from '@frontend-types/common/workout-type.enum';

export class UpdateWorkoutDto {
  public id!: number;

  public name?: string;

  public fitnessLevel?: FitnessLevel;

  public workoutType?: WorkoutType[];

  public workoutTime?: WorkoutTime;

  public price?: number;

  public calories?: number;

  public description?: string;

  public sex?: UserSex;

  public isSpecialOffer?: boolean;
}
