import { State } from '../../types/state.type';
import { User } from '../../types/user.interface';
import { AuthorizationStatus, ReducerName } from '../../utils/constant';

export const getIsAuthorized = (state: State): boolean => state[ReducerName.User].authStatus === AuthorizationStatus.Auth;
export const getAuthCheckedStatus = (state: State): boolean => state[ReducerName.User].authStatus !== AuthorizationStatus.Unknown;
export const getUserData = (state: State): User|null => state[ReducerName.User].userData;
