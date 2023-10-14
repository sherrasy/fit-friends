import { FitnessLevel } from "../common/fitness-level.enum";
import { WorkoutType } from "../common/workout-type.enum";
import { User } from "./user.interface";

export interface DetailsCoach extends User{
  fitnessLevel: FitnessLevel;
  workoutType: WorkoutType[];
  certificate?: string;
  successInfo?: string;
  isPersonal: boolean;
}
