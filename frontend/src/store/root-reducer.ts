import { combineReducers } from '@reduxjs/toolkit';
import { ReducerName } from '../utils/constant';
import { userData } from './user-data/user-data';
import { accountData } from './account-data/account-data';
import { workoutData } from './workout-data/workout-data';


export const rootReducer = combineReducers({
  [ReducerName.User]: userData.reducer,
  [ReducerName.Account]: accountData.reducer,
  [ReducerName.Workout]: workoutData.reducer,
});
