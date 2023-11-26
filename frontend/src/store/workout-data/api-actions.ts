import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state.type';
import { AxiosInstance } from 'axios';
import { ActionName, ApiRoute, CardsLimit, DefaultParam, ReducerName } from '../../utils/constant';
import { Workout } from '../../types/workout.interface';
import { Query } from '../../types/query.type';
import { User } from '../../types/user.interface';
import { toast } from 'react-toastify';
import { Review } from '../../types/review.interface';
import { getSpecialPrice } from '../../utils/helpers';

export const fetchWorkouts = createAsyncThunk<Workout[], Query|undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Workout}/${ActionName.FetchWorkouts}`,
  async (query, { dispatch, extra: api}) => {
    try{
      const {data} = await api.get<Workout[]>(ApiRoute.WorkoutsShow);
      const workouts = data.map((workout)=>({...workout, specialPrice: workout.isSpecialOffer ? getSpecialPrice(workout.price) : null}));
      return workouts;
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
      const workouts = data.map((workout)=>({...workout, specialPrice: workout.isSpecialOffer ? getSpecialPrice(workout.price) : null}));
      return workouts.slice(DefaultParam.Amount,CardsLimit.SpecialForUser);
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
      const workouts = data.map((workout)=>({...workout, specialPrice: workout.isSpecialOffer ? getSpecialPrice(workout.price) : null}));
      return workouts;
    }catch(error){
      return Promise.reject(error);
    }
  },
);

export const fetchWorkout = createAsyncThunk<Workout, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Workout}/${ActionName.fetchWorkout}`,
  async (id, { dispatch, extra: api}) => {
    try{
      const {data} = await api.get<Workout>(`${ApiRoute.WorkoutsMain}/${id}`);
      const workout = {...data, specialPrice: data.isSpecialOffer ? getSpecialPrice(data.price) : null};
      return workout;
    }catch(error){
      return Promise.reject(error);
    }
  },
);
export const fetchReviews = createAsyncThunk<Review[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Workout}/${ActionName.fetchReviews}`,
  async (id, { dispatch, extra: api}) => {
    try{
      const {data} = await api.get<Review[]>(`${ApiRoute.ReviewsShow}/${id}`);
      return data;
    }catch(error){
      return Promise.reject(error);
    }
  },
);

