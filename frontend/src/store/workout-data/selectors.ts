import { State } from '../../types/state.type';
import { Workout } from '../../types/workout.interface';
import { ReducerName } from '../../utils/constant';

export const getWorkoutsLoadingStatus = (state: State): boolean => state[ReducerName.Workout].isWorkoutsLoading;
export const getWorkouts = (state: State): Workout[]|null => state[ReducerName.Workout].workouts;
