import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state.type';
import { AxiosInstance } from 'axios';
import { ActionName, ApiRoute, CardsLimit, DefaultParam, ReducerName } from '../../utils/constant';
import { Workout } from '../../types/workout.interface';
import { Query } from '../../types/query.type';
import { User } from '../../types/user.interface';
import { toast } from 'react-toastify';

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

export const fetchUserSpecialWorkouts = createAsyncThunk<Workout[]|null, User, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Workout}/${ActionName.FetchUserSpecialWorkouts}`,
  async (user, { dispatch, extra: api}) => {
    try{
      const {workoutType,sportsmanInfo } = user;
      if(!sportsmanInfo){
        toast.warn('Invalid request data');
        return null;
      }
      const caloriesQuery = `caloriesMax=${sportsmanInfo.caloriesTotal}`;
      const workoutTypeQuery = `&workoutType=${workoutType.join(',')}`;
      const {data} = await api.get<Workout[]>(`${ApiRoute.WorkoutsShow}?${caloriesQuery}${workoutTypeQuery}`);
      return data.slice(DefaultParam.Amount,CardsLimit.SpecialForUser);
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

