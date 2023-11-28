import { FitnessLevel } from '../../../types/common/fitness-level.enum';
import { WorkoutTime } from '../../../types/common/workout-time.enum';
import { WorkoutType } from '../../../types/common/workout-type.enum';

export class UpdateSportsmanDto {
  public fitnessLevel?: FitnessLevel;

  public workoutType?: WorkoutType[];

  public workoutTime?: WorkoutTime;

  public caloriesTotal?: number;

  public caloriesPerDay?: number;

  public isReady?: boolean;
}
