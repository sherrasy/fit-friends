import { FitnessLevel } from "../common/fitness-level.enum";
import { WorkoutTime } from "../common/workout-time.enum";
import { WorkoutType } from "../common/workout-type.enum";
import { User } from "./user.interface";

export interface Sportsman extends User {
  fitnessLevel: FitnessLevel;
  workoutType: WorkoutType[];
  workoutTime: WorkoutTime;
  caloriesTotal: number;
  caloriesPerDay: number;
  isReady: boolean;
}
