import { combineReducers } from '@reduxjs/toolkit';
import { ReducerName } from '../utils/constant';
import { userData } from './user-data/user-data';


export const rootReducer = combineReducers({
  [ReducerName.User]: userData.reducer,
});
