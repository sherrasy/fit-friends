import { DefaultParam } from '@utils/constant';
import { makeFakeReviews, makeFakeWorkout, makeFakeWorkouts } from '@utils/mocks';

export const fakeWorkout = makeFakeWorkout();
export const fakeWorkouts = makeFakeWorkouts();
export const fakeReviews = makeFakeReviews();
export const fakeExtraWorkouts = {
  specialWorkouts: fakeWorkouts,
  fullWorkouts: fakeWorkouts,
  popularWorkouts: fakeWorkouts,
  totalWorkouts: fakeWorkouts.length,
  maxPrice: DefaultParam.Amount,
};
export const fakeWorkoutsData = {
  workouts: fakeWorkouts,
  totalWorkouts:fakeWorkouts.length,
  maxPrice:DefaultParam.Amount,
};
