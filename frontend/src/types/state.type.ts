import {store} from '../store/index.js';
import { UserAuthStatus } from './user-auth-status.type.js';
import { UserRole } from './user-role.enum.js';
import { User, NewUserGeneral } from './user.interface.js';
import { Workout } from './workout.interface.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserState = {
  authStatus: UserAuthStatus;
  userId:number|null;
  role:UserRole|null;
  userData:User|null;
  userListData:User[]|null;
  newUserData:NewUserGeneral|null;
  isUserLoading:boolean;
  isUserListLoading:boolean;
  isUserUpdating:boolean;
  isEmailExists:boolean;
 }

export type AccountState = {
  friends: User[]|null;
  isFriendsLoading:boolean;
 }

export type WorkoutState = {
  workouts: Workout[]|null;
  isWorkoutsLoading:boolean;
 }
