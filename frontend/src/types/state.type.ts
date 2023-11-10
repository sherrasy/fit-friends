import {store} from '../store/index.js';
import { UserAuthStatus } from './user-auth-status.type.js';
import { User } from './user.type.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserState = {
  authStatus: UserAuthStatus;
  userData: User | null;
 }
