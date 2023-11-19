import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../utils/constant';
import { AccountState } from '../../types/state.type';
import { fetchFriends } from './api-actions';

const initialState:AccountState = {
  friends:null,
  isFriendsLoading:false,
};


export const accountData = createSlice({
  name: ReducerName.Account,
  initialState,
  reducers:{ },
  extraReducers(builder){
    builder
      .addCase(fetchFriends.pending, (state) => {
        state.isFriendsLoading = true;
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.friends = action.payload;
        state.isFriendsLoading = false;
      })
      .addCase(fetchFriends.rejected, (state) => {
        state.isFriendsLoading = false;
      });
  }
});

