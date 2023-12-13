import { createSlice } from '@reduxjs/toolkit';
import { AccountState } from '../../types/state.type';
import { DefaultParam, ReducerName } from '../../utils/constant';
import { addFriend, fetchCoachCertificates, fetchCoachOrders, fetchFriends, fetchNotifications, fetchUserOrders, removeFriend, removeNotification } from './api-actions';

const initialState:AccountState = {
  friends:null,
  friendsAmount:DefaultParam.Amount,
  orders:null,
  notifications:null,
  coachOrders:null,
  certificates:null,
  ordersAmount:DefaultParam.Amount,
  isFriendsLoading:DefaultParam.Status,
  isOrdersLoading:DefaultParam.Status,
  isFriendStatusChanging:DefaultParam.Status,
  isNotificationsLoading:DefaultParam.Status,
  isNotificationDeleting:DefaultParam.Status,
  hasNotificationsError:DefaultParam.Status,
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
        state.isFriendsLoading = DefaultParam.Status;
      })
      .addCase(fetchFriends.rejected, (state) => {
        state.isFriendsLoading = DefaultParam.Status;
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isOrdersLoading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isOrdersLoading = DefaultParam.Status;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.isOrdersLoading = DefaultParam.Status;
      })
      .addCase(fetchCoachOrders.pending, (state) => {
        state.isOrdersLoading = true;
      })
      .addCase(fetchCoachOrders.fulfilled, (state, action) => {
        state.coachOrders = action.payload.orders;
        state.ordersAmount = action.payload.ordersAmount;
        state.isOrdersLoading = DefaultParam.Status;
      })
      .addCase(fetchCoachOrders.rejected, (state) => {
        state.isOrdersLoading = DefaultParam.Status;
      })
      .addCase(fetchNotifications.pending, (state) => {
        state.isNotificationsLoading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.isNotificationsLoading = DefaultParam.Status;
      })
      .addCase(fetchCoachCertificates.fulfilled, (state, action) => {
        state.certificates = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.isNotificationsLoading = DefaultParam.Status;
      })
      .addCase(removeNotification.pending, (state) => {
        state.isNotificationDeleting = true;
        state.hasNotificationsError = DefaultParam.Status;
      })
      .addCase(removeNotification.fulfilled, (state) => {
        state.isNotificationDeleting = DefaultParam.Status;
        state.hasNotificationsError = DefaultParam.Status;
      })
      .addCase(removeNotification.rejected, (state) => {
        state.isNotificationDeleting = DefaultParam.Status;
        state.hasNotificationsError = true;
      })
      .addCase(addFriend.pending, (state) => {
        state.isFriendStatusChanging = true;
      })
      .addCase(addFriend.fulfilled, (state) => {
        state.isFriendStatusChanging = DefaultParam.Status;
      })
      .addCase(addFriend.rejected, (state) => {
        state.isFriendStatusChanging = DefaultParam.Status;
      })
      .addCase(removeFriend.pending, (state) => {
        state.isFriendStatusChanging = true;
      })
      .addCase(removeFriend.fulfilled, (state) => {
        state.isFriendStatusChanging = DefaultParam.Status;
      })
      .addCase(removeFriend.rejected, (state) => {
        state.isFriendStatusChanging = DefaultParam.Status;
      });
  }
});

