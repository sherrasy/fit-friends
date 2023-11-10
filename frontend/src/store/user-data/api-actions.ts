import {AxiosInstance, AxiosError} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {dropToken, saveToken} from '../../services/token';
import { toast } from 'react-toastify';
import { AppDispatch, State } from '../../types/state.type';
import { ActionName, ApiRoute, AppRoute, ReducerName } from '../../utils/constant';
import { redirectToRoute } from '../action';
import { AuthData } from '../../types/auth-data.type';
import { CreateUserDto } from '../../dto/user/create/create-user.dto';
import { StatusCodes } from 'http-status-codes';
import { TokenData, TokenPayloadData } from '../../types/token-data.type';
import { User } from '../../types/user.interface';
import { jwtDecode } from 'jwt-decode';
import { UserRole } from '../../types/user-role.enum';


export const checkAuth = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.User}/${ActionName.CheckAuth}`,
  async (_arg, {extra: api}) => {
    try{
      const {data} = await api.get<User>(ApiRoute.CheckLogin);
      return data;
    }catch(error){
      const axiosError = error as AxiosError;
      if(axiosError.response?.status === StatusCodes.UNAUTHORIZED){
        dropToken();
      }
      return Promise.reject(error);
    }
  }
);

export const login = createAsyncThunk<TokenPayloadData|void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.User}/${ActionName.Login}`,
  async (authData, { dispatch, extra: api}) => {
    try{
      const {data} = await api.post<TokenData>(ApiRoute.Login, authData);
      const { accessToken } = data;
      saveToken(accessToken);
      const userInfo:TokenPayloadData = jwtDecode(accessToken);

      if(userInfo.role === UserRole.Coach) {
        dispatch(redirectToRoute(AppRoute.CoachAccount));
      }
      else {
        dispatch(redirectToRoute(AppRoute.Main));
      }
      return userInfo;
    }
    catch(error){
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.statusText, {toastId:ActionName.Login});
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
      const axiosError = error as AxiosError;
      toast.error(axiosError.message, {toastId:ActionName.Register});
    }
  },
);
