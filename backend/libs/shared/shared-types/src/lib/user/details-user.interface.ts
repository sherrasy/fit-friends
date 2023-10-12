import { FitnessLevel } from "../common/fitness-level.enum";
import { WorkoutTime } from "../common/workout-time.enum";
import { WorkoutType } from "../common/workout-type.enum";

export interface DetailsUser {
  userId: string;
  fitnessLevel: FitnessLevel;
  workoutType: WorkoutType[];
  workoutTime: WorkoutTime;
  caloriesTotal: number;
  caloriesPerDay: number;
  isReady: boolean;
}
