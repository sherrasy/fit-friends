import { FitnessLevel, Sportsman, WorkoutTime, WorkoutType } from '@backend/shared/shared-types';
import { UserEntity } from './user.entity';

export class SportsmanEntity extends UserEntity implements Sportsman {
  public fitnessLevel: FitnessLevel;
  public workoutType: WorkoutType[];
  public workoutTime: WorkoutTime;
  public caloriesTotal: number;
  public caloriesPerDay: number;
  public isReady: boolean;

  constructor(sportsman: Sportsman) {
    super(sportsman);
    this.fillEntity(sportsman);
  }

  public fillEntity(sportsman: Sportsman) {
    this.fitnessLevel = sportsman.fitnessLevel;
    this.workoutType = sportsman.workoutType;
    this.workoutTime = sportsman.workoutTime;
    this.caloriesTotal = sportsman.caloriesTotal;
    this.caloriesPerDay = sportsman.caloriesPerDay;
    this.isReady = sportsman.isReady;
  }
}
