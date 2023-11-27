import { State } from '../../types/state.type';
import { Workout } from '../../types/workout.interface';
import { CardsLimit, ReducerName } from '../../utils/constant';
import { Review } from '../../types/review.interface';

export const getWorkoutsLoadingStatus = (state: State): boolean => state[ReducerName.Workout].isWorkoutsLoading;
export const getWorkoutLoadingStatus = (state: State): boolean => state[ReducerName.Workout].isWorkoutLoading;
export const getReviewsLoadingStatus = (state: State): boolean => state[ReducerName.Workout].isReviewsLoading;
export const getWorkouts = (state: State): Workout[]|null => state[ReducerName.Workout].workouts;
export const getPages = (state: State): number => Math.ceil(state[ReducerName.Workout].totalAmount / CardsLimit.Default);
export const getWorkout = (state: State): Workout|null => state[ReducerName.Workout].workout;
export const getReviews = (state: State): Review[]|null => state[ReducerName.Workout].reviews;
export const getMaxPrice = (state: State): number => state[ReducerName.Workout].maxPrice;
export const getSpecialUserWorkouts = (state: State): Workout[]|null => state[ReducerName.Workout].specialUserWorkouts;
export const getSpecialWorkouts = (state: State): Workout[]|null => state[ReducerName.Workout].specialOfferWorkouts;
export const getPopularWorkouts = (state: State): Workout[]|null => state[ReducerName.Workout].popularWorkouts;

