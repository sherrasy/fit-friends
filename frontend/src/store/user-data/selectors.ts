import { createSelector } from '@reduxjs/toolkit';
import { State } from '../../types/state.type';
import { UserRole } from '../../types/common/user-role.enum';
import { User, NewUserGeneral } from '../../types/user/user.interface';
import { AuthorizationStatus, CardsLimit, DefaultParam, ReducerName } from '../../utils/constant';

export const getIsAuthorized = (state: State): boolean => state[ReducerName.User].authStatus === AuthorizationStatus.Auth;
export const getAuthCheckedStatus = (state: State): boolean => state[ReducerName.User].authStatus !== AuthorizationStatus.Unknown;
export const getCurrentUserData = (state: State): User|null => state[ReducerName.User].currentUserData;
export const getUserData = (state: State): User|null => state[ReducerName.User].userData;
export const getUserRole = (state: State): UserRole|null => state[ReducerName.User].role;
export const getUserId = (state: State): number|null => state[ReducerName.User].userId;
export const getCurrentUserLoadingStatus = (state: State): boolean => state[ReducerName.User].isCurrentUserLoading;
export const getUserLoadingStatus = (state: State): boolean => state[ReducerName.User].isUserLoading;
export const getUserListLoadingStatus = (state: State): boolean => state[ReducerName.User].isUserListLoading;
export const getUserUpdatingStatus = (state: State): boolean => state[ReducerName.User].isUserUpdating;
export const getEmailExistsStatus = (state: State): boolean => state[ReducerName.User].isEmailExists;
export const getNewUserData = (state: State): NewUserGeneral|null => state[ReducerName.User].newUserData;
export const getUserList = (state: State): User[]|null => state[ReducerName.User].userListData;
export const getUserError = (state: State): boolean => state[ReducerName.User].hasUserError;
export const getUserPages = (state: State): number => Math.ceil(state[ReducerName.User].totalAmount / CardsLimit.Default);

export const getReadyUsers = createSelector(
  [getUserList],
  (users): User[] | null => users ? users.filter((user)=> user.sportsmanInfo?.isReady).slice(DefaultParam.Amount,CardsLimit.ReadyUsers) : null
);
