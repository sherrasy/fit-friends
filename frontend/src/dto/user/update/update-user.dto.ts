import { FitnessLevel } from '../../../types/common/fitness-level.enum';
import { Location } from '../../../types/common/location.enum';
import { UserSex } from '../../../types/common/user-sex.enum';
import { WorkoutType } from '../../../types/common/workout-type.enum';
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

  public sportsmanInfo?: UpdateSportsmanDto|null;

  public coachInfo?: UpdateCoachDto | null;
}
