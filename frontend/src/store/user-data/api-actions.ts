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
import { setUserData } from './user-data';
import { UpdateUserDto } from '../../dto/user/update/update-user.dto';


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
      const {data :  { accessToken }} = await api.post<TokenData>(ApiRoute.Login, authData);
      saveToken(accessToken);
      const userInfo:TokenPayloadData = jwtDecode(accessToken);
      dispatch(fetchUser(userInfo.sub));
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

export const register = createAsyncThunk<void, CreateUserDto, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.User}/${ActionName.Register}`,
  async (userData, { dispatch, extra: api}) => {
    try{
      const {data:newUser} = await api.post<CreateUserDto>(ApiRoute.Register, userData);
      const {data: {accessToken}} = await api.post<TokenData>(ApiRoute.Login, {email: userData.email, password: userData.password});
      saveToken(accessToken);
      const authInfo:TokenPayloadData = jwtDecode(accessToken);
      dispatch(setUserData({...newUser, id:authInfo.sub}));
      if(newUser.role === UserRole.Coach) {
        dispatch(redirectToRoute(AppRoute.CoachAccount));
      }
      else {
        dispatch(redirectToRoute(AppRoute.Main));
      }
    }
    catch(error){
      const axiosError = error as AxiosError;
      toast.error(axiosError.message, {toastId:ActionName.Register});
    }
  },
);

export const fetchUser = createAsyncThunk<User, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.User}/${ActionName.FetchUser}`,
  async (id, { dispatch, extra: api}) => {
    try{
      const {data} = await api.get<User>(`${ApiRoute.UsersMain}/${id}`);
      return data;
    }
    catch(error){
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.statusText, {toastId:ActionName.FetchUser});
      return Promise.reject(error);

    }
  },
);

export const updateUser = createAsyncThunk<User, UpdateUserDto, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.User}/${ActionName.UpdateUser}`,
  async (dto, { dispatch, extra: api}) => {
    try{
      const {data} = await api.patch<User>(ApiRoute.UpdateUser, dto);
      return data;
    }
    catch(error){
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.statusText, {toastId:ActionName.UpdateUser});
      return Promise.reject(error);

    }
  },
);
