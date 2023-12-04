import { createSlice } from '@reduxjs/toolkit';
import { DefaultParam, ReducerName } from '../../utils/constant';
import { AccountState } from '../../types/state.type';
import { addFriend, fetchCoachCertificates, fetchCoachOrders, fetchFriends, fetchNotifications, fetchUserOrders, removeFriend, removeNotification } from './api-actions';

const initialState:AccountState = {
  friends:null,
  friendsAmount:DefaultParam.Amount,
  orders:null,
  notifications:null,
  coachOrders:null,
  certificates:null,
  ordersAmount:DefaultParam.Amount,
  isFriendsLoading:false,
  isOrdersLoading:false,
  isFriendStatusChanging:false,
  isNotificationsLoading:false,
  isNotificationDeleting:false,
  hasNotificationsError:false,
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
        state.friends = action.payload.friends;
        state.friendsAmount = action.payload.friendsAmount;
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
        state.coachOrders = action.payload.orders;
        state.ordersAmount = action.payload.ordersAmount;
        state.isOrdersLoading = false;
      })
      .addCase(fetchCoachOrders.rejected, (state) => {
        state.isOrdersLoading = false;
      })
      .addCase(fetchNotifications.pending, (state) => {
        state.isNotificationsLoading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.isNotificationsLoading = false;
      })
      .addCase(fetchCoachCertificates.fulfilled, (state, action) => {
        state.certificates = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.isNotificationsLoading = false;
      })
      .addCase(removeNotification.pending, (state) => {
        state.isNotificationDeleting = true;
        state.hasNotificationsError = false;
      })
      .addCase(removeNotification.fulfilled, (state) => {
        state.isNotificationDeleting = false;
        state.hasNotificationsError = false;
      })
      .addCase(removeNotification.rejected, (state) => {
        state.isNotificationDeleting = false;
        state.hasNotificationsError = true;
      })
      .addCase(addFriend.pending, (state) => {
        state.isFriendStatusChanging = true;
      })
      .addCase(addFriend.fulfilled, (state) => {
        state.isFriendStatusChanging = false;
      })
      .addCase(addFriend.rejected, (state) => {
        state.isFriendStatusChanging = false;
      })
      .addCase(removeFriend.pending, (state) => {
        state.isFriendStatusChanging = true;
      })
      .addCase(removeFriend.fulfilled, (state) => {
        state.isFriendStatusChanging = false;
      })
      .addCase(removeFriend.rejected, (state) => {
        state.isFriendStatusChanging = false;
      });
  }
});

