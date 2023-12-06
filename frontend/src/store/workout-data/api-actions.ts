import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state.type';
import { AxiosError, AxiosInstance } from 'axios';
import {
  ActionName,
  ApiRoute,
  AppRoute,
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
import { CreateWorkoutDto } from '../../dto/workout/create-workout.dto';
import { adaptVideoToServer } from '../../utils/adapters/adaptersToServer';
import { redirectToRoute } from '../action';
import { UpdateWorkoutDto } from '../../dto/workout/update-workout.dto';
import { File } from '../../types/reaction/file.interface';
import { FileType } from '../../types/reaction/file.type';

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
      return { specialWorkouts, popularWorkouts, totalWorkouts, maxPrice, fullWorkouts:workoutsData };
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
      if (data.video) {
        const { data: video } = await api.get<File>(
          `${ApiRoute.File}/${data.video}`
        );
        const videoPath = video ? video.path : null;
        return{...workout, videoPath };
      }
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

export const createWorkout = createAsyncThunk<
  Workout,
  CreateWorkoutDto & FileType,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Workout}/${ActionName.CreateWorkout}`,
  async (dto, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<Workout>(`${ApiRoute.CreateWorkout}`, dto);
      if (data && dto.videoFile?.name) {
        const {data:workoutWithVideo} = await api.post<Workout>(`${ApiRoute.WorkoutsMain}/${data.id}${ApiRoute.UploadVideo}`, adaptVideoToServer(dto.videoFile) );
        return workoutWithVideo;
      }
      dispatch(redirectToRoute(AppRoute.CoachAccount));
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.message, {toastId:ActionName.CreateWorkout});
      return Promise.reject(error);
    }
  }
);
export const updateWorkout = createAsyncThunk<
  void,
  UpdateWorkoutDto & FileType,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Workout}/${ActionName.UpdateWorkout}`,
  async (dto, { dispatch, extra: api }) => {
    try {
      const { data } = await api.patch<Workout>(`${ApiRoute.WorkoutsMain}/${dto.id}`, dto);
      if (data && dto.videoFile?.name) {
        await api.post<Workout>(`${ApiRoute.WorkoutsMain}/${data.id}${ApiRoute.UploadVideo}`, adaptVideoToServer(dto.videoFile) );
      }
      dispatch(fetchWorkout(data.id));
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.message, {toastId:ActionName.UpdateWorkout});
      return Promise.reject(error);
    }
  }
);
