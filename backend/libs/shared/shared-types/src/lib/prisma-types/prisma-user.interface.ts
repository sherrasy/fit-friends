type UserRole = 'coach' | 'sportsman';
type UserSex = 'male' | 'female' | 'any';
type Location =
  | 'pionerskaya'
  | 'petrogradskaya'
  | 'udelnaya'
  | 'zvyozdnaya'
  | 'sportivnaya';
type FitnessLevel = 'beginner' | 'amateur' | 'pro';
type WorkoutType =
  | 'yoga'
  | 'running'
  | 'boxing'
  | 'stretching'
  | 'crossfit'
  | 'aerobics'
  | 'pilates';

export type PrismaSportsman = {
  sportsmanId: number;
  userId: number;
  workoutTime: string;
  caloriesTotal: number;
  caloriesPerDay: number;
  isReady: boolean;
};

export type PrismaCoach = {
  coachId: number;
  userId: number;
  successInfo: string | null;
  certificate: string | null;
  isPersonal: boolean | null;
};

export interface PrismaUser {
  userId: number;
  name: string;
  email: string;
  password: string;
  sex: UserSex;
  role: UserRole;
  location: Location;
  fitnessLevel: FitnessLevel;
  workoutType: WorkoutType[];
  description: string;
  birthDate: string;
  createdDate: Date;
  updatedDate: Date;
  avatar: string;
  photo: string;
  sportsmanInfo?: PrismaSportsman | null;
  coachInfo?: PrismaCoach | null;
}
