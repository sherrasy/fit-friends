import { createSelector } from '@reduxjs/toolkit';
import { Order, OrderCoach } from '../../types/reaction/order.interface';
import { State } from '../../types/state.type';
import { User } from '../../types/user/user.interface';
import { ReducerName } from '../../utils/constant';
import { UserNotification } from '../../types/reaction/user-notification.interface';

export const getFriendsLoadingStatus = (state: State): boolean => state[ReducerName.Account].isFriendsLoading;
export const getOrdersLoadingStatus = (state: State): boolean => state[ReducerName.Account].isOrdersLoading;
export const getFriends = (state: State): User[]|null => state[ReducerName.Account].friends;
export const getOrders = (state: State): Order[]|null => state[ReducerName.Account].orders;
export const getCoachOrders = (state: State): OrderCoach[]|null => state[ReducerName.Account].coachOrders;
export const getNotifications = (state: State): UserNotification[]|null => state[ReducerName.Account].notifications;
export const getNotificationsLoading = (state: State): boolean => state[ReducerName.Account].isNotificationsLoading;
export const getNotificationDeleting = (state: State): boolean => state[ReducerName.Account].isNotificationDeleting;
export const getNotificationsError = (state: State): boolean => state[ReducerName.Account].hasNotificationsError;

export const getActiveOrders = createSelector(
  [getOrders],
  (orders): Order[] | null => orders ? orders.filter((order)=> order.amount !== order.amountDone) : null
);
