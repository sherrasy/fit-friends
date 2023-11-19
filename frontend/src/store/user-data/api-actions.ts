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
import { FileType } from '../../types/file.type';
import { adaptAvatarToServer } from '../../utils/adapters/adaptersToServer';
import { File } from '../../types/file.interface';
import { Query } from '../../types/query.type';


export const checkAuth = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.User}/${ActionName.CheckAuth}`,
  async (_arg, {extra: api}) => {
    try{
      const {data} = await api.get<User>(ApiRoute.CheckLogin);
      const userPhotos = {
        avatarPath: '',
      };
      if(data.avatar){
        const {data:avatar} = await api.get<File>(`${ApiRoute.File}/${data.avatar}`);
        userPhotos.avatarPath = avatar ? avatar.path : '';
      }
      return {...data, ...userPhotos};
    }catch(error){
      const axiosError = error as AxiosError;
      if(axiosError.response?.status === StatusCodes.UNAUTHORIZED){
        dropToken();
      }
      return Promise.reject(error);
    }
  }
);

export const checkEmail = createAsyncThunk<boolean, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.User}/${ActionName.CheckEmail}`,
  async (email, {extra: api}) => {
    const {data} = await api.post<User>(ApiRoute.CheckEmail, {email});
    return !!data;
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

export const register = createAsyncThunk<void, CreateUserDto & FileType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.User}/${ActionName.Register}`,
  async (userData, { dispatch, extra: api}) => {
    try{
      const {data:newUser} = await api.post<User>(ApiRoute.Register, userData);
      const {data: {accessToken}} = await api.post<TokenData>(ApiRoute.Login, {email: userData.email, password: userData.password});
      saveToken(accessToken);
      const authInfo:TokenPayloadData = jwtDecode(accessToken);
      if(newUser && userData.avatarFile?.name){
        const {data} = await api.post<User>(ApiRoute.UploadAvatar, adaptAvatarToServer(userData.avatarFile) );
        dispatch(setUserData({...data, id:authInfo.sub}));
      } else {
        dispatch(setUserData({...newUser, id:authInfo.sub}));
      }

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
      const userPhotos = {
        avatarPath: '',
        photoPath:'',
      };
      if(data.avatar){
        const {data:avatar} = await api.get<File>(`${ApiRoute.File}/${data.avatar}`);
        userPhotos.avatarPath = avatar ? avatar.path : '';
      }
      return {...data, ...userPhotos};
    }
    catch(error){
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.statusText, {toastId:ActionName.FetchUser});
      return Promise.reject(error);

    }
  },
);

export const fetchUserList = createAsyncThunk<User[], Query|undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.User}/${ActionName.FetchUserList}`,
  async (query, { dispatch, extra: api}) => {
    try{
      const {data} = await api.get<User[]>(ApiRoute.UsersShow);
      await Promise.all(data.map(async(item)=>{
        if(item.avatar){
          const {data:{path}} = await api.get<File>(`${ApiRoute.File}/${item.avatar}`);
          item.avatarPath = path || '';
        }
      }));
      return data;
    }
    catch(error){
      return Promise.reject(error);

    }
  },
);

export const updateUser = createAsyncThunk<User, UpdateUserDto & FileType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.User}/${ActionName.UpdateUser}`,
  async (dto, { dispatch, extra: api}) => {
    try{
      const {data} = await api.patch<User>(ApiRoute.UpdateUser, dto);
      if( dto.avatarFile?.name){
        await api.post<User>(ApiRoute.UploadAvatar, adaptAvatarToServer(dto.avatarFile) );
      }
      return data;
    }
    catch(error){
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.statusText, {toastId:ActionName.UpdateUser});
      return Promise.reject(error);
    }
  },
);
