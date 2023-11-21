import { createSelector } from '@reduxjs/toolkit';
import { Order } from '../../types/order.interface';
import { State } from '../../types/state.type';
import { User } from '../../types/user.interface';
import { ReducerName } from '../../utils/constant';

export const getFriendsLoadingStatus = (state: State): boolean => state[ReducerName.Account].isFriendsLoading;
export const getOrdersLoadingStatus = (state: State): boolean => state[ReducerName.Account].isOrdersLoading;
export const getFriends = (state: State): User[]|null => state[ReducerName.Account].friends;
export const getOrders = (state: State): Order[]|null => state[ReducerName.Account].orders;

export const getActiveOrders = createSelector(
  [getOrders],
  (orders): Order[] | null => orders ? orders.filter((order)=> order.amount !== order.amountDone) : null
);
