import { FitnessLevel } from '@frontend-types/common/fitness-level.enum';
import { Location } from '@frontend-types/common/location.enum';
import { UserRole } from '@frontend-types/common/user-role.enum';
import { UserSex } from '@frontend-types/common/user-sex.enum';
import { WorkoutType } from '@frontend-types/common/workout-type.enum';
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
