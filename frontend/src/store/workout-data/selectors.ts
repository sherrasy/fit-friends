import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/state.type';
import { Workout } from '../../types/workout.interface';
import { CardsLimit, DefaultParam, ReducerName } from '../../utils/constant';
import { Review } from '../../types/review.interface';

export const getWorkoutsLoadingStatus = (state: State): boolean => state[ReducerName.Workout].isWorkoutsLoading;
export const getWorkoutLoadingStatus = (state: State): boolean => state[ReducerName.Workout].isWorkoutLoading;
export const getReviewsLoadingStatus = (state: State): boolean => state[ReducerName.Workout].isReviewsLoading;
export const getWorkouts = (state: State): Workout[]|null => state[ReducerName.Workout].workouts;
export const getWorkout = (state: State): Workout|null => state[ReducerName.Workout].workout;
export const getReviews = (state: State): Review[]|null => state[ReducerName.Workout].reviews;
export const getSpecialUserWorkouts = (state: State): Workout[]|null => state[ReducerName.Workout].specialUserWorkouts;

export const getSpecialWorkouts = createSelector(
  [getWorkouts],
  (workouts): Workout[] | undefined => workouts?.filter((workout)=> workout.isSpecialOffer).slice(DefaultParam.Amount,CardsLimit.SpecialOffer)
);

export const getPopularWorkouts = createSelector(
  [getWorkouts],
  (workouts): Workout[] |null => workouts ? [...workouts].sort((workoutA, workoutB)=> workoutB.rating - workoutA.rating).slice(DefaultParam.Amount,CardsLimit.Default) : null
);
