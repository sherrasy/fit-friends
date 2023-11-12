import { Coach } from './coach.interface';
import { FitnessLevel } from './fitness-level.enum';
import { Location } from './location.enum';
import { Sportsman } from './sportsman.interface';
import { UserRole } from './user-role.enum';
import { UserSex } from './user-sex.enum';
import { WorkoutTime } from './workout-time.enum';
import { WorkoutType } from './workout-type.enum';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  sex: UserSex;
  birthDate?: string;
  role: UserRole;
  description?: string;
  location: Location;
  photo?: string;
  createdDate?: string;
  fitnessLevel: FitnessLevel;
  workoutType: WorkoutType[];
  sportsmanInfo?: Sportsman | null;
  coachInfo?: Coach | null;
  token?:string|undefined;
}

export interface NewUserGeneral {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  sex: UserSex;
  birthDate: string;
  role: UserRole;
  location: Location;
}

export interface NewUserSportsman {
  workoutType: WorkoutType[];
  fitnessLevel: FitnessLevel;
  sportsmanInfo:{
  workoutTime: WorkoutTime;
  caloriesTotal: number;
  caloriesPerDay: number;
};
}

export interface NewUserCoach {
  workoutType: WorkoutType[];
  fitnessLevel: FitnessLevel;
  coachInfo:{
  certificate?: string;
  successInfo: string;
  isPersonal: boolean;
};
}

