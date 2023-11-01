import { Workout } from '@backend/shared/shared-types';

export class SendNewsletterWorkoutsDto {
  public email: string;
  public workouts: Workout[];
}
