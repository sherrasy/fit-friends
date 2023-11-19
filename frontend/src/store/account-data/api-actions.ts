import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../types/state.type';
import { AxiosInstance } from 'axios';
import { ActionName, ApiRoute, ReducerName } from '../../utils/constant';
import { User } from '../../types/user.interface';
import { File } from '../../types/file.interface';

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

