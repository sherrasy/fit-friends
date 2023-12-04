import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state.type';
import { AxiosInstance } from 'axios';
import { ActionName, ApiRoute, ReducerName } from '../../utils/constant';
import { FriendData, User } from '../../types/user/user.interface';
import { Certificate, File } from '../../types/reaction/file.interface';
import { Order, OrderCoach, OrderCoachData } from '../../types/reaction/order.interface';
import { UserNotification } from '../../types/reaction/user-notification.interface';
import { Query } from '../../types/query.type';
import { getFriendsQueryString, getOrdersQueryString } from '../../utils/helpers';
import { FileType } from '../../types/reaction/file.type';
import { adaptCertificateToServer } from '../../utils/adapters/adaptersToServer';

export const fetchFriends = createAsyncThunk<
  FriendData,
  Query|undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Account}/${ActionName.FetchFriends}`,
  async (query, { dispatch, extra: api }) => {
    try {
      const queryString = getFriendsQueryString(query);
      const { data:friends } = await api.get<User[]>(`${ApiRoute.Friends}/${queryString}`);
      const { data:friendsAmount } = await api.get<number>(`${ApiRoute.Friends}/count`);
      await Promise.all(
        friends.map(async (item) => {
          if (item.avatar) {
            const {
              data: { path },
            } = await api.get<File>(`${ApiRoute.File}/${item.avatar}`);
            item.avatarPath = path || '';
          }
        })
      );
      return {friends, friendsAmount};
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
export const addFriend = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Account}/${ActionName.AddFriend}`,
  async (id, { dispatch, extra: api }) => {
    try {
      await api.post<User>(`${ApiRoute.Friends}/${id}`);
      dispatch(fetchFriends());
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const removeFriend = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Account}/${ActionName.RemoveFriend}`,
  async (id, { dispatch, extra: api }) => {
    try {
      await api.delete(`${ApiRoute.Friends}/${id}`);
      dispatch(fetchFriends());
    } catch (error) {
      return Promise.reject(error);
    }
  }
);


export const fetchUserOrders = createAsyncThunk<
  Order[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Account}/${ActionName.FetchUserOrders}`,
  async (_args, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Order[]>(ApiRoute.PurchasesShow);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const fetchCoachOrders = createAsyncThunk<
  OrderCoachData,
  Query|undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Account}/${ActionName.FetchCoachOrders}`,
  async (query, { dispatch, extra: api }) => {
    try {
      const queryString = getOrdersQueryString(query);
      const { data:orders } = await api.get<OrderCoach[]>(`${ApiRoute.OrdersShow}/${queryString}`);
      const { data:ordersAmount } = await api.get<number>(`${ApiRoute.OrdersShow}/count`);
      return {orders, ordersAmount};
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const fetchCoachCertificates = createAsyncThunk<
  Certificate[]|null,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Account}/${ActionName.FetchCertificates}`,
  async (certificates, { dispatch, extra: api }) => {
    try {
      if(!certificates){
        return null;
      }
      const certificatesData = certificates.split(',');
      const certificatePaths = await Promise.all(certificatesData.map(async(item)=> {
        const { data: { path } } = await api.get<File>(`${ApiRoute.File}/${item}`);
        return {path, id:item};
      } ));
      return certificatePaths;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const postCertificate = createAsyncThunk<void, FileType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
 }>(
   `${ReducerName.Account}/${ActionName.PostCertificate}`,
   async ({certificateFile}: FileType, { dispatch, extra: api }) => {
     if (certificateFile) {
       const {data} = await api.post<User>(ApiRoute.UploadCertificate, adaptCertificateToServer(certificateFile));
       if(data.coachInfo?.certificate){
         dispatch(fetchCoachCertificates(data.coachInfo?.certificate));
       }
     }
   });


export const fetchNotifications = createAsyncThunk<
  UserNotification[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Account}/${ActionName.FetchNotifications}`,
  async (_args, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserNotification[]>(
        ApiRoute.Notifications
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const removeNotification = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Account}/${ActionName.RemoveNotification}`,
  async (id, { dispatch, extra: api }) => {
    try {
      await api.delete<UserNotification[]>(`${ApiRoute.Notifications}/${id}`);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
