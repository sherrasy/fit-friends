import { Subscriber, Workout } from '@backend/shared/shared-types';
import dayjs from 'dayjs';

export const getNewWorkouts = (
  workouts: Workout[],
  { dateNotify, subscriptions }: Subscriber
) =>
  workouts.filter(
    (workout) =>
      subscriptions.some((item) => item === workout.coachId) &&
      dayjs(workout.createdDate).isAfter(dateNotify)
  );
