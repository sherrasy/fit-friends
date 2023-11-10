import { State } from '../../types/state.type';
import { AuthorizationStatus, ReducerName } from '../../utils/constant';

export const getIsAuthorized = (state: State): boolean => state[ReducerName.User].authStatus === AuthorizationStatus.Auth;
export const getAuthCheckedStatus = (state: State): boolean => state[ReducerName.User].authStatus !== AuthorizationStatus.Unknown;
