import { State } from '../../types/state.type';
import { UserRole } from '../../types/user-role.enum';
import { User, NewUserGeneral } from '../../types/user.interface';
import { AuthorizationStatus, ReducerName } from '../../utils/constant';

export const getIsAuthorized = (state: State): boolean => state[ReducerName.User].authStatus === AuthorizationStatus.Auth;
export const getAuthCheckedStatus = (state: State): boolean => state[ReducerName.User].authStatus !== AuthorizationStatus.Unknown;
export const getUserData = (state: State): User|null => state[ReducerName.User].userData;
export const getUserRole = (state: State): UserRole|null => state[ReducerName.User].role;
export const getUserId = (state: State): number|null => state[ReducerName.User].userId;
export const getUserLoadingStatus = (state: State): boolean => state[ReducerName.User].isUserLoading;
export const getNewUserData = (state: State): NewUserGeneral|null => state[ReducerName.User].newUserData;
