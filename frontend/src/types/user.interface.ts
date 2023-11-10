import { Coach } from './coach.interface';
import { FitnessLevel } from './fitness-level.enum';
import { Sportsman } from './sportsman.interface';
import { UserRole } from './user-role.enum';
import { UserSex } from './user-sex.enum';
import { WorkoutType } from './workout-type.enum';

export interface User {
  id: number;
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
  createdDate: string;
  fitnessLevel: FitnessLevel;
  workoutType: WorkoutType[];
  sportsmanInfo?: Sportsman | null;
  coachInfo?: Coach | null;
  token?:string|undefined;
}

