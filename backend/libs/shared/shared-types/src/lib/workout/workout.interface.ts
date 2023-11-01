import { FitnessLevel } from '../common/fitness-level.enum';
import { UserSex } from '../common/user-sex.enum';
import { WorkoutTime } from '../common/workout-time.enum';
import { WorkoutType } from '../common/workout-type.enum';

export interface Workout {
  id?: number;
  name: string;
  photo?: string;
  fitnessLevel: FitnessLevel;
  workoutType: WorkoutType[];
  workoutTime: WorkoutTime;
  price: number;
  calories: number;
  description: string;
  sex: UserSex;
  video?: string;
  rating: number;
  coachId: number;
  isSpecialOffer: boolean;
  createdDate: string;
  amountOrdered: number;
  priceOrdered: number;
}
