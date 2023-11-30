import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state.type';
import { AxiosInstance } from 'axios';
import { ActionName, ApiRoute, ReducerName } from '../../utils/constant';
import { FriendData, User } from '../../types/user/user.interface';
import { File } from '../../types/reaction/file.interface';
import { Order, OrderCoach, OrderCoachData } from '../../types/reaction/order.interface';
import { UserNotification } from '../../types/reaction/user-notification.interface';
import { Query } from '../../types/query.type';
import { getFriendsQueryString, getOrdersQueryString } from '../../utils/helpers';

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
