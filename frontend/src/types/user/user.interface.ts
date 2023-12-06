import { Coach } from './coach.interface';
import { FitnessLevel } from '../common/fitness-level.enum';
import { Location } from '../common/location.enum';
import { Sportsman } from './sportsman.interface';
import { UserRole } from '../common/user-role.enum';
import { UserSex } from '../common/user-sex.enum';
import { WorkoutTime } from '../common/workout-time.enum';
import { WorkoutType } from '../common/workout-type.enum';

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
  avatarPath?:string;
}
export interface UserInfoInterface {
  name: string;
  avatar?: string;
  sex: UserSex;
  birthDate?: string;
  description?: string;
  location: Location;
  fitnessLevel: FitnessLevel;
  workoutType: WorkoutType[];
  sportsmanInfo?: Sportsman | null;
  coachInfo?: Coach | null;
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

export interface FriendData {
  friends: User[];
  friendsAmount: number;
}
