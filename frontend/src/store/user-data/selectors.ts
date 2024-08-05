import { State } from '@frontend-types/state.type';
import { UserRole } from '@frontend-types/common/user-role.enum';
import { User, NewUserGeneral } from '@frontend-types/user/user.interface';
import { AuthorizationStatus, CardsLimit, ReducerName } from '@utils/constant';
import { createSelector } from '@reduxjs/toolkit';

export const getIsAuthorized = (state: Pick<State, ReducerName.User> ): boolean => state[ReducerName.User].authStatus === AuthorizationStatus.Auth;
export const getAuthCheckedStatus = (state: Pick<State, ReducerName.User>): boolean => state[ReducerName.User].authStatus !== AuthorizationStatus.Unknown;
export const getUserData = (state: Pick<State, ReducerName.User>): User|null => state[ReducerName.User].userData;
export const getCurrentUserData = (state: Pick<State, ReducerName.User>): User|null => state[ReducerName.User].currentUserData;
export const getUserRole = (state: Pick<State, ReducerName.User>): UserRole|null => state[ReducerName.User].role;
export const getUserId = (state: Pick<State, ReducerName.User>): number|null => state[ReducerName.User].userId;
export const getCurrentUserLoadingStatus = (state: Pick<State, ReducerName.User>): boolean => state[ReducerName.User].isCurrentUserLoading;
export const getUserLoadingStatus = (state: Pick<State, ReducerName.User>): boolean => state[ReducerName.User].isUserLoading;
export const getUserListLoadingStatus = (state: Pick<State, ReducerName.User>): boolean => state[ReducerName.User].isUserListLoading;
export const getUserUpdatingStatus = (state: Pick<State, ReducerName.User>): boolean => state[ReducerName.User].isUserUpdating;
export const getEmailExistsStatus = (state: Pick<State, ReducerName.User>): boolean => state[ReducerName.User].isEmailExists;
export const getNewUserData = (state: Pick<State, ReducerName.User>): NewUserGeneral|null => state[ReducerName.User].newUserData;
export const getUserList = (state: Pick<State, ReducerName.User>): User[]|null => state[ReducerName.User].userListData;
export const getReadyUsers = (state: Pick<State, ReducerName.User>): User[]|null => state[ReducerName.User].readyUsers;
export const getUserError = (state: Pick<State, ReducerName.User>): boolean => state[ReducerName.User].hasUserError;

const selectTotalAmount = (state: Pick<State, ReducerName.User>) =>
  state[ReducerName.User].totalAmount;
export const getUserPages = createSelector(
  [selectTotalAmount],
  (totalAmount) => Math.ceil(totalAmount / CardsLimit.Default)
);
