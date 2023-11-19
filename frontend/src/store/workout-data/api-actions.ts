import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state.type';
import { AxiosInstance } from 'axios';
import { ActionName, ApiRoute, ReducerName } from '../../utils/constant';
import { Workout } from '../../types/workout.interface';
import { Query } from '../../types/query.type';

export const fetchWorkouts = createAsyncThunk<Workout[], Query|undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Workout}/${ActionName.FetchWorkouts}`,
  async (query, { dispatch, extra: api}) => {
    try{
      const {data} = await api.get<Workout[]>(ApiRoute.WorkoutsShow);
      return data;
    }catch(error){
      return Promise.reject(error);
    }
  },
);

export const fetchCoachWorkouts = createAsyncThunk<Workout[], Query|undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Workout}/${ActionName.fetchCoachWorkouts}`,
  async (query, { dispatch, extra: api}) => {
    try{
      const {data} = await api.get<Workout[]>(ApiRoute.CoachWorkoutsShow);
      return data;
    }catch(error){
      return Promise.reject(error);
    }
  },
);

