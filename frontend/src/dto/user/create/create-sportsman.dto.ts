import { WorkoutTime } from '../../../types/common/workout-time.enum';

export class CreateSportsmanDto {
  public workoutTime!: WorkoutTime;

  public caloriesTotal!: number;

  public caloriesPerDay!: number;

  public isReady!: boolean;
}
