import { State } from '../../types/state.type';
import { User } from '../../types/user.interface';
import { ReducerName } from '../../utils/constant';

export const getFriendsLoadingStatus = (state: State): boolean => state[ReducerName.Account].isFriendsLoading;
export const getFriends = (state: State): User[]|null => state[ReducerName.Account].friends;
