import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state.type';
import { AxiosInstance } from 'axios';
import { ActionName, ApiRoute, ReducerName } from '../../utils/constant';
import { User } from '../../types/user/user.interface';
import { File } from '../../types/reaction/file.interface';
import { Order, OrderCoach } from '../../types/reaction/order.interface';

export const fetchFriends = createAsyncThunk<User[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Account}/${ActionName.FetchFriends}`,
  async (_args, { dispatch, extra: api}) => {
    try{
      const {data} = await api.get<User[]>(ApiRoute.Friends);
      await Promise.all(data.map(async(item)=>{
        if(item.avatar){
          const {data:{path}} = await api.get<File>(`${ApiRoute.File}/${item.avatar}`);
          item.avatarPath = path || '';
        }
      }));
      return data;
    }catch(error){
      return Promise.reject(error);
    }
  },
);

export const fetchUserOrders = createAsyncThunk<Order[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Account}/${ActionName.FetchUserOrders}`,
  async (_args, { dispatch, extra: api}) => {
    try{
      const {data} = await api.get<Order[]>(ApiRoute.PurchasesShow);
      return data;
    }catch(error){
      return Promise.reject(error);
    }
  },
);
export const fetchCoachOrders = createAsyncThunk<OrderCoach[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  `${ReducerName.Account}/${ActionName.FetchCoachOrders}`,
  async (_args, { dispatch, extra: api}) => {
    try{
      const {data} = await api.get<OrderCoach[]>(ApiRoute.OrdersShow);
      return data;
    }catch(error){
      return Promise.reject(error);
    }
  },
);

