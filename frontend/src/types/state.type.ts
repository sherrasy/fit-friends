import {store} from '../store/index.js';
import { UserAuthStatus } from './user-auth-status.type.js';
import { UserRole } from './user-role.enum.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserState = {
  authStatus: UserAuthStatus;
  userId:number|null;
  role:UserRole|null;
 }
