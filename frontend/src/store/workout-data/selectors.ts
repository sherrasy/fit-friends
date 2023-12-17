import { createSelector } from '@reduxjs/toolkit';
import { Review } from '../../types/reaction/review.interface';
import { State } from '../../types/state.type';
import { Workout } from '../../types/workout/workout.interface';
import { CardsLimit, ReducerName } from '../../utils/constant';

export const getWorkoutsLoadingStatus = (state: Pick<State, ReducerName.Workout>): boolean => state[ReducerName.Workout].isWorkoutsLoading;
export const getWorkoutLoadingStatus = (state: Pick<State, ReducerName.Workout>): boolean => state[ReducerName.Workout].isWorkoutLoading;
export const getWorkoutPostingStatus = (state: Pick<State, ReducerName.Workout>): boolean => state[ReducerName.Workout].isWorkoutPosting;
export const getReviewsLoadingStatus = (state: Pick<State, ReducerName.Workout>): boolean => state[ReducerName.Workout].isReviewsLoading;
export const getWorkouts = (state: Pick<State, ReducerName.Workout>): Workout[]|null => state[ReducerName.Workout].workouts;
export const getPages = (state: Pick<State, ReducerName.Workout>): number => Math.ceil(state[ReducerName.Workout].totalAmount / CardsLimit.Default);
export const getWorkout = (state: Pick<State, ReducerName.Workout>): Workout|null => state[ReducerName.Workout].workout;
export const getReviews = (state: Pick<State, ReducerName.Workout>): Review[]|null => state[ReducerName.Workout].reviews;
export const getMaxPrice = (state: Pick<State, ReducerName.Workout>): number => state[ReducerName.Workout].maxPrice;
export const getSpecialUserWorkouts = (state: Pick<State, ReducerName.Workout>): Workout[]|null => state[ReducerName.Workout].specialUserWorkouts;
export const getSpecialWorkouts = (state: Pick<State, ReducerName.Workout>): Workout[]|null => state[ReducerName.Workout].specialOfferWorkouts;
export const getPopularWorkouts = (state: Pick<State, ReducerName.Workout>): Workout[]|null => state[ReducerName.Workout].popularWorkouts;
export const getAllWorkouts = (state: Pick<State, ReducerName.Workout>): Workout[]|null => state[ReducerName.Workout].fullWorkouts;
export const getWorkoutsByCoach = (coachId?:string)=> createSelector(
  [getAllWorkouts],
  (workouts): Workout[] | null => (coachId && workouts) ? workouts.filter((item)=> item.coachId === +coachId) : null
);

