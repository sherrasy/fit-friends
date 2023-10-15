import { Coach, FitnessLevel, WorkoutType } from '@backend/shared/shared-types';
import { UserEntity } from './user.entity';

export class CoachEntity extends UserEntity implements Coach {
  public fitnessLevel: FitnessLevel;
  public workoutType: WorkoutType[];
  public certificate: string;
  public successInfo?: string;
  public isPersonal: boolean;

  constructor(coach: Coach) {
    super(coach);
    this.fillEntity(coach);
  }

  public fillEntity(coach: Coach) {
    this.fitnessLevel = coach.fitnessLevel;
    this.workoutType = coach.workoutType;
    this.certificate = coach.certificate;
    this.successInfo = coach.successInfo;
  }
}
