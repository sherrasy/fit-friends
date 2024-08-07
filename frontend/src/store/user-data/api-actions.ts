import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { CreateUserDto } from '@dto/user/create/create-user.dto';
import { UpdateUserDto } from '@dto/user/update/update-user.dto';
import { dropToken, saveToken } from '@services/token';
import { UserRole } from '@frontend-types/common/user-role.enum';
import { Query } from '@frontend-types/query.type';
import { File } from '@frontend-types/reaction/file.interface';
import { FileType } from '@frontend-types/reaction/file.type';
import { AppDispatch, State } from '@frontend-types/state.type';
import { AuthData } from '@frontend-types/user/auth-data.type';
import { TokenData, TokenPayloadData } from '@frontend-types/user/token-data.type';
import { User } from '@frontend-types/user/user.interface';
import { adaptAvatarToServer, adaptCertificateToServer } from '@utils/adapters/adaptersToServer';
import {
  ActionName,
  ApiRoute,
  AppRoute,
  CardsLimit,
  DefaultParam,
  ReducerName,
} from '@utils/constant';
import { getUserQueryString } from '@utils/helpers';
import { redirectToRoute } from '../action';
import { setUserData } from './user-data';

export const checkAuth = createAsyncThunk<
  User,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.User}/${ActionName.CheckAuth}`,
  async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get<User>(ApiRoute.CheckLogin);
      const userPhotos = {
        avatarPath: '',
      };
      if (data.avatar) {
        const { data: avatar } = await api.get<File>(
          `${ApiRoute.File}/${data.avatar}`
        );
        userPhotos.avatarPath = avatar ? avatar.path : '';
      }
      return { ...data, ...userPhotos };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === StatusCodes.UNAUTHORIZED) {
        dropToken();
      }
      return Promise.reject(error);
    }
  }
);

export const checkEmail = createAsyncThunk<
  boolean,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.User}/${ActionName.CheckEmail}`,
  async (email, { extra: api }) => {
    const { data } = await api.post<User>(ApiRoute.CheckEmail, { email });
    return !!data;
  }
);

export const login = createAsyncThunk<
  TokenPayloadData | void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.User}/${ActionName.Login}`,
  async (authData, { dispatch, extra: api }) => {
    try {
      const {
        data: { accessToken },
      } = await api.post<TokenData>(ApiRoute.Login, authData);
      saveToken(accessToken);
      const userInfo: TokenPayloadData = jwtDecode(accessToken);
      dispatch(fetchCurrentUser(userInfo.sub));
      if (userInfo.role === UserRole.Coach) {
        dispatch(redirectToRoute(AppRoute.CoachAccount));
      } else {
        dispatch(redirectToRoute(AppRoute.Main));
      }
      return userInfo;
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.statusText, {
        toastId: ActionName.Login,
      });
    }
  }
);

export const register = createAsyncThunk<
  void,
  CreateUserDto & FileType,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.User}/${ActionName.Register}`,
  async (userData, { dispatch, extra: api }) => {
    try {
      const { data: newUser } = await api.post<User>(
        ApiRoute.Register,
        userData
      );
      const {
        data: { accessToken },
      } = await api.post<TokenData>(ApiRoute.Login, {
        email: userData.email,
        password: userData.password,
      });
      saveToken(accessToken);
      if (newUser && userData.avatarFile?.name) {
        await api.post<User>(
          ApiRoute.UploadAvatar,
          adaptAvatarToServer(userData.avatarFile)
        );
      }
      if (newUser.role === UserRole.Coach && userData.certificateFile?.name) {
        await api.post<User>(
          `${ApiRoute.UploadCertificate}`,
          adaptCertificateToServer(userData.certificateFile)
        );
      }
      dispatch(setUserData(newUser));
      dispatch(fetchCurrentUser(newUser.id));

      if (newUser.role === UserRole.Coach) {
        dispatch(redirectToRoute(AppRoute.CoachAccount));
      } else {
        dispatch(redirectToRoute(AppRoute.Main));
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.message, { toastId: ActionName.Register });
    }
  }
);

export const fetchUser = createAsyncThunk<
  User,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.User}/${ActionName.FetchUser}`,
  async (id, { extra: api }) => {
    try {
      const { data } = await api.get<User>(`${ApiRoute.UsersMain}/${id}`);
      const userPhotos = {
        avatarPath: '',
      };
      if (data.avatar) {
        const { data: avatar } = await api.get<File>(
          `${ApiRoute.File}/${data.avatar}`
        );
        userPhotos.avatarPath = avatar ? avatar.path : '';
      }
      return { ...data, ...userPhotos };
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.statusText, {
        toastId: ActionName.FetchUser,
      });
      return Promise.reject(error);
    }
  }
);
export const fetchCurrentUser = createAsyncThunk<
  User,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.User}/${ActionName.FetchCurrentUser}`,
  async (id, { extra: api }) => {
    try {
      const { data } = await api.get<User>(`${ApiRoute.UsersMain}/${id}`);
      const userPhotos = {
        avatarPath: '',
      };
      if (data.avatar) {
        const { data: avatar } = await api.get<File>(
          `${ApiRoute.File}/${data.avatar}`
        );
        userPhotos.avatarPath = avatar ? avatar.path : '';
      }
      return { ...data, ...userPhotos };
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.statusText, {
        toastId: ActionName.FetchUser,
      });
      return Promise.reject(error);
    }
  }
);

export const fetchReadyUserList = createAsyncThunk<
  User[],
  Query | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.User}/${ActionName.FetchReadyUserList}`,
  async (_query, { dispatch, extra: api }) => {
    try {
      const queryString = `?role=${UserRole.Sportsman}`;
      const { data } = await api.get<User[]>(
        `${ApiRoute.UsersShow}${queryString}`
      );
      await Promise.all(
        data
          .filter((item) => item.sportsmanInfo && item.sportsmanInfo.isReady)
          .slice(CardsLimit.ReadyUsers)
          .map(async (item) => {
            if (item.avatar) {
              const {
                data: { path },
              } = await api.get<File>(`${ApiRoute.File}/${item.avatar}`);
              item.avatarPath = path || '';
            }
          })
      );
      dispatch(fetchUserListAmount());
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const fetchUserList = createAsyncThunk<
  User[],
  Query | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.User}/${ActionName.FetchUserList}`,
  async (query, { dispatch, extra: api }) => {
    try {
      const queryString = query
        ? getUserQueryString(query)
        : `?limit=${CardsLimit.Default}&page=${DefaultParam.Step}`;
      const { data } = await api.get<User[]>(
        `${ApiRoute.UsersShow}${queryString}`
      );
      await Promise.all(
        data.map(async (item) => {
          if (item.avatar) {
            const {
              data: { path },
            } = await api.get<File>(`${ApiRoute.File}/${item.avatar}`);
            item.avatarPath = path || '';
          }
        })
      );
      dispatch(fetchUserListAmount());
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const fetchUserListAmount = createAsyncThunk<
  number,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.User}/${ActionName.FetchUserListAmount}`,
  async (_query, { extra: api }) => {
    const { data } = await api.get<number>(`${ApiRoute.UsersShow}/count`);
    return data;
  }
);

export const updateUser = createAsyncThunk<
  void,
  UpdateUserDto & FileType,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.User}/${ActionName.UpdateUser}`,
  async (dto, { dispatch, extra: api }) => {
    try {
      const { data } = await api.patch<User>(ApiRoute.UpdateUser, dto);
      if (dto.avatarFile?.name) {
        await api.post<User>(
          ApiRoute.UploadAvatar,
          adaptAvatarToServer(dto.avatarFile)
        );
      }
      dispatch(fetchCurrentUser(data.id));
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.statusText, {
        toastId: ActionName.UpdateUser,
      });
      return Promise.reject(error);
    }
  }
);
