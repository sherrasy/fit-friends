import { FitnessLevel } from '../../../types/fitness-level.enum';
import { WorkoutTime } from '../../../types/workout-time.enum';
import { WorkoutType } from '../../../types/workout-type.enum';

export class UpdateSportsmanDto {
  public fitnessLevel?: FitnessLevel;

  public workoutType?: WorkoutType[];

  public workoutTime?: WorkoutTime;

  public caloriesTotal?: number;

  public caloriesPerDay?: number;

  public isReady?: boolean;
}
