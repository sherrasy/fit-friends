import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state.type';
import { AxiosInstance } from 'axios';
import {
  ActionName,
  ApiRoute,
  CardsLimit,
  DefaultParam,
  ReducerName,
  SortingFieldName,
} from '../../utils/constant';
import {
  ExtraWorkoutsData,
  Workout,
  WorkoutsData,
} from '../../types/workout/workout.interface';
import { Query } from '../../types/query.type';
import { User } from '../../types/user/user.interface';
import { toast } from 'react-toastify';
import { Review } from '../../types/reaction/review.interface';
import { getWorkoutQueryString, getSpecialPrice } from '../../utils/helpers';
import { UserRole } from '../../types/common/user-role.enum';

export const fetchWorkouts = createAsyncThunk<
  Workout[],
  Query | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Workout}/${ActionName.FetchWorkouts}`,
  async (query, { dispatch, extra: api }) => {
    try {
      const queryString = query ? getWorkoutQueryString(query) : `?limit=${CardsLimit.Default}&page=${DefaultParam.Step}&sortBy=${SortingFieldName.Date}`;
      const {
        data
      } = await api.get<Workout[]>(`${ApiRoute.WorkoutsShow}${queryString}`);
      const workoutsData = data.map((workout) => ({
        ...workout,
        specialPrice: workout.isSpecialOffer
          ? getSpecialPrice(workout.price)
          : null,
      }));
      return workoutsData;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const fetchExtraWorkouts = createAsyncThunk<
  ExtraWorkoutsData,
  UserRole,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Workout}/${ActionName.FetchExtraWorkouts}`,
  async (role, { dispatch, extra: api }) => {
    try {
      if(role === UserRole.Coach){
        const {
          data: { workouts, totalWorkouts, maxPrice },
        } = await api.get<WorkoutsData>(`${ApiRoute.CoachWorkoutsShow}/extra`);
        const workoutsData = workouts.map((workout) => ({
          ...workout,
          specialPrice: workout.isSpecialOffer
            ? getSpecialPrice(workout.price)
            : null,
        }));
        return { workouts: workoutsData, totalWorkouts, maxPrice };
      }
      const {
        data: { workouts, totalWorkouts, maxPrice },
      } = await api.get<WorkoutsData>(`${ApiRoute.WorkoutsShow}/extra`);
      const workoutsData = workouts.map((workout) => ({
        ...workout,
        specialPrice: workout.isSpecialOffer
          ? getSpecialPrice(workout.price)
          : null,
      }));
      const specialWorkouts = workoutsData
        .filter((workout) => workout.isSpecialOffer)
        .slice(DefaultParam.Amount, CardsLimit.SpecialOffer);
      const popularWorkouts = [...workoutsData]
        .sort((workoutA, workoutB) => workoutB.rating - workoutA.rating)
        .slice(DefaultParam.Amount, CardsLimit.Default);
      return { specialWorkouts, popularWorkouts, totalWorkouts, maxPrice };
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const fetchUserSpecialWorkouts = createAsyncThunk<
  Workout[] | null,
  User,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Workout}/${ActionName.FetchUserSpecialWorkouts}`,
  async (user, { dispatch, extra: api }) => {
    try {
      const { workoutType, sportsmanInfo } = user;
      if (!sportsmanInfo) {
        toast.warn('Invalid request data');
        return null;
      }
      const caloriesQuery = `caloriesMax=${sportsmanInfo.caloriesTotal}`;
      const workoutTypeQuery = `&workoutType=${workoutType.join(',')}`;
      const {
        data
      } = await api.get<Workout[]>(
        `${ApiRoute.WorkoutsShow}?${caloriesQuery}${workoutTypeQuery}`
      );
      const workoutsData = data.map((workout) => ({
        ...workout,
        specialPrice: workout.isSpecialOffer
          ? getSpecialPrice(workout.price)
          : null,
      }));
      return workoutsData.slice(DefaultParam.Amount, CardsLimit.SpecialForUser);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const fetchCoachWorkouts = createAsyncThunk<
Workout[],
  Query | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Workout}/${ActionName.FetchCoachWorkouts}`,
  async (query, { dispatch, extra: api }) => {
    try {
      const queryString = query ? getWorkoutQueryString(query) : `?limit=${CardsLimit.Default}&page=${DefaultParam.Step}&sortBy=${SortingFieldName.Date}`;
      const {
        data
      } = await api.get<Workout[]>(`${ApiRoute.CoachWorkoutsShow}${queryString}`);
      const workoutsData = data.map((workout) => ({
        ...workout,
        specialPrice: workout.isSpecialOffer
          ? getSpecialPrice(workout.price)
          : null,
      }));
      return workoutsData;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const fetchWorkout = createAsyncThunk<
  Workout,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Workout}/${ActionName.FetchWorkout}`,
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Workout>(`${ApiRoute.WorkoutsMain}/${id}`);
      const workout = {
        ...data,
        specialPrice: data.isSpecialOffer ? getSpecialPrice(data.price) : null,
      };
      return workout;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
export const fetchReviews = createAsyncThunk<
  Review[],
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Workout}/${ActionName.FetchReviews}`,
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Review[]>(`${ApiRoute.ReviewsShow}/${id}`);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
