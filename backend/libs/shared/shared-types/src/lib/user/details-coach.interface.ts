import { FitnessLevel } from "../common/fitness-level.enum";
import { WorkoutType } from "../common/workout-type.enum";

export interface DetailsCoach {
  userId: string;
  fitnesslevel: FitnessLevel;
  trainingType: WorkoutType[];
  certificate?: string[];
  successInfo: string;
  isPersonal: boolean;
}
