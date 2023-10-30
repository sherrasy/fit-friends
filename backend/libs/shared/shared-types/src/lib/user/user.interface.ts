import { Location } from "../common/location.enum";
import { UserRole } from "../common/user-role.enum";
import { UserSex } from "../common/user-sex.enum";
import { FitnessLevel } from "../common/fitness-level.enum";
import { WorkoutType } from "../common/workout-type.enum";
import { Sportsman } from "./sportsman.interface";
import { Coach } from "./coach.interface";

export interface User {
  _id?: number;
  name: string;
  email: string;
  avatar?: string;
  passwordHash: string;
  sex: UserSex;
  birthDate?: string;
  role: UserRole;
  description?: string;
  location: Location;
  photo?: string;
  createdDate:string;
  fitnessLevel: FitnessLevel;
  workoutType: WorkoutType[];
  sportsmanInfo?: Sportsman|null;
  coachInfo?: Coach|null;
  subscriptions?: number[];
}
