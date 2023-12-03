import { FitnessLevel } from '../../types/common/fitness-level.enum';
import { UserSex } from '../../types/common/user-sex.enum';
import { WorkoutTime } from '../../types/common/workout-time.enum';
import { WorkoutType } from '../../types/common/workout-type.enum';

export class UpdateWorkoutDto {
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
