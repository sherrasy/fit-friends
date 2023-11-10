import {AxiosInstance, AxiosError} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {saveToken} from '../../services/token';
import { toast } from 'react-toastify';
import { AppDispatch, State } from '../../types/state.type';
import { ActionName, ApiRoute, AppRoute, ReducerName, VALIDATION_ERROR_NAME } from '../../utils/constant';
import { redirectToRoute } from '../action';
import { AxiosErrorResponse } from '../../types/axios-error-response.type';
import { User } from '../../types/user.interface';
import { AuthData } from '../../types/auth-data.type';
import { getValidationErrorMessages } from '../../utils/helpers';
import { CreateUserDto } from '../../dto/user/create/create-user.dto';
import { UserData } from '../../types/user-data.type';


export const checkAuth = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.User}/${ActionName.CheckAuth}`,
  async (_arg, {extra: api}) => {
    try{
      const {data} = await api.get<User>(ApiRoute.Login);
      return data;
    }catch(error){
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message, {toastId:ActionName.CheckAuth});
      return Promise.reject(error);
    }
  }
);

export const login = createAsyncThunk<UserData|void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.User}/${ActionName.Login}`,
  async (authData, { dispatch, extra: api}) => {
    try{
      const {data} = await api.post<UserData>(ApiRoute.Login, authData);
      const { token } = data;
      saveToken(token);
      dispatch(redirectToRoute(AppRoute.Main));
      return data;
    }
    catch(error){
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      const isValidationError = axiosError.response?.data.errorType === VALIDATION_ERROR_NAME;
      const errorMessage = isValidationError ? getValidationErrorMessages(axiosError) : axiosError.response?.data.message;
      toast.error(errorMessage, {toastId:ActionName.Login});
    }
  },
);

export const register = createAsyncThunk< void, CreateUserDto, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.User}/${ActionName.Register}`,
  async (authData, { dispatch, extra: api}) => {
    try{
      await api.post<CreateUserDto>(ApiRoute.Register, authData);
      dispatch(redirectToRoute(AppRoute.Login));
    }
    catch(error){
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message, {toastId:ActionName.Register});
    }
  },
);
