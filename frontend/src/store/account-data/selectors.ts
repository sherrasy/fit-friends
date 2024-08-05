import { createSelector } from '@reduxjs/toolkit';
import { Certificate } from '@frontend-types/reaction/file.interface';
import { Order, OrderCoach } from '@frontend-types/reaction/order.interface';
import { UserNotification } from '@frontend-types/reaction/user-notification.interface';
import { State } from '@frontend-types/state.type';
import { User } from '@frontend-types/user/user.interface';
import { CardsLimit, DefaultParam, ReducerName } from '@utils/constant';

export const getFriendsLoadingStatus = (state: Pick<State, ReducerName.Account>): boolean => state[ReducerName.Account].isFriendsLoading;
export const getOrdersLoadingStatus = (state: Pick<State, ReducerName.Account>): boolean => state[ReducerName.Account].isOrdersLoading;
export const getFriends = (state: Pick<State, ReducerName.Account>): User[]|null => state[ReducerName.Account].friends;
export const getFriendChanging = (state: Pick<State, ReducerName.Account>): boolean => state[ReducerName.Account].isFriendStatusChanging;
export const getOrders = (state: Pick<State, ReducerName.Account>): Order[]|null => state[ReducerName.Account].orders;
export const getCertificates = (state: Pick<State, ReducerName.Account>): Certificate[]|null => state[ReducerName.Account].certificates;
export const getCoachOrders = (state: Pick<State, ReducerName.Account>): OrderCoach[]|null => state[ReducerName.Account].coachOrders;
export const getNotifications = (state: Pick<State, ReducerName.Account>): UserNotification[]|null => state[ReducerName.Account].notifications;
export const getNotificationsLoading = (state: Pick<State, ReducerName.Account>): boolean => state[ReducerName.Account].isNotificationsLoading;
export const getNotificationDeleting = (state: Pick<State, ReducerName.Account>): boolean => state[ReducerName.Account].isNotificationDeleting;
export const getNotificationsError = (state: Pick<State, ReducerName.Account>): boolean => state[ReducerName.Account].hasNotificationsError;

const selectTotalFriendsAmount = (state: Pick<State, ReducerName.Account>) =>
  state[ReducerName.Account].friendsAmount;
export const getFriendsPages = createSelector(
  [selectTotalFriendsAmount],
  (totalAmount) => Math.ceil(totalAmount / CardsLimit.Default)
);

const selectTotalOrdersAmount = (state: Pick<State, ReducerName.Account>) =>
  state[ReducerName.Account].ordersAmount;
export const getOrdersPages = createSelector(
  [selectTotalOrdersAmount],
  (totalAmount) => Math.ceil(totalAmount / CardsLimit.CoachOrders)
);

export const getActiveOrders = createSelector(
  [getOrders],
  (orders): Order[] | null => orders ? orders.filter((order)=> order.amount !== order.amountDone) : null
);

export const getIsBought = (id?:string)=> createSelector(
  [getOrders],
  (orders): Order | undefined => (id && orders) ? orders.find((order)=> order.workoutId === +id) : undefined
);

export const getUserFriendStatus = (friendId:number)=> createSelector(
  [getFriends],
  (friends):boolean => friends ? friends.some((friend)=> friend.id === friendId ) : DefaultParam.Status
);
