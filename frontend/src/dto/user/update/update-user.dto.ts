import { FitnessLevel } from '../../../types/fitness-level.enum';
import { UserSex } from '../../../types/user-sex.enum';
import { WorkoutType } from '../../../types/workout-type.enum';
import { UpdateCoachDto } from './update-coach.dto';
import { UpdateSportsmanDto } from './update-sportsman.dto';

export class UpdateUserDto {
  public name?: string;

  public sex?: UserSex;

  public location?: Location;

  public description?: string;

  public birthDate?: string;

  public fitnessLevel?: FitnessLevel;

  public workoutType?: WorkoutType[];

  public sportsmanInfo?: UpdateSportsmanDto;

  public coachInfo?: UpdateCoachDto;
}
