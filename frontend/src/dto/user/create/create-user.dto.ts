import { FitnessLevel } from '../../../types/fitness-level.enum';
import { UserRole } from '../../../types/user-role.enum';
import { UserSex } from '../../../types/user-sex.enum';
import { WorkoutType } from '../../../types/workout-type.enum';
import { CreateCoachDto } from './create-coach.dto';
import { CreateSportsmanDto } from './create-sportsman.dto';

export class CreateUserDto {
  public name!: string;

  public email!: string;

  public password!: string;

  public sex!: UserSex;

  public role!: UserRole;

  public location!: Location;

  public description?: string;

  public birthDate?: string;

  public fitnessLevel!: FitnessLevel;

  public workoutType!: WorkoutType[];

  public sportsmanInfo?: CreateSportsmanDto;

  public coachInfo?: CreateCoachDto;
}
