import { createSlice } from '@reduxjs/toolkit';
import { ReducerName } from '../../utils/constant';
import { AccountState } from '../../types/state.type';
import { fetchCoachOrders, fetchFriends, fetchUserOrders } from './api-actions';

const initialState:AccountState = {
  friends:null,
  orders:null,
  isFriendsLoading:false,
  isOrdersLoading:false
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
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isOrdersLoading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isOrdersLoading = false;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.isOrdersLoading = false;
      })
      .addCase(fetchCoachOrders.pending, (state) => {
        state.isOrdersLoading = true;
      })
      .addCase(fetchCoachOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isOrdersLoading = false;
      })
      .addCase(fetchCoachOrders.rejected, (state) => {
        state.isOrdersLoading = false;
      });
  }
});

