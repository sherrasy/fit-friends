import {store} from '../store/index.js';
import { UserAuthStatus } from './user-auth-status.type.js';
import { UserRole } from './user-role.enum.js';
import { User, NewUserGeneral } from './user.interface.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserState = {
  authStatus: UserAuthStatus;
  userId:number|null;
  role:UserRole|null;
  userData:User|null;
  newUserData:NewUserGeneral|null;
 }
