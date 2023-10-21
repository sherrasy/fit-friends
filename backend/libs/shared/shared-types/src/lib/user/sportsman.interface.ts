import { WorkoutTime } from '../common/workout-time.enum';

export interface Sportsman {
  sportsmanId?: number;
  userId?: number;
  workoutTime?: WorkoutTime;
  caloriesTotal?: number;
  caloriesPerDay?: number;
  isReady?: boolean;
}
