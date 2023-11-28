import {store} from '../store/index.js';
import { Order, OrderCoach } from './reaction/order.interface.js';
import { Review } from './reaction/review.interface.js';
import { UserAuthStatus } from './user/user-auth-status.type.js';
import { UserRole } from './common/user-role.enum.js';
import { User, NewUserGeneral } from './user/user.interface.js';
import { Workout } from './workout/workout.interface.js';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserState = {
  authStatus: UserAuthStatus;
  userId:number|null;
  role:UserRole|null;
  currentUserData:User|null;
  userData:User|null;
  userListData:User[]|null;
  newUserData:NewUserGeneral|null;
  isCurrentUserLoading:boolean;
  isUserLoading:boolean;
  isUserListLoading:boolean;
  isUserUpdating:boolean;
  isEmailExists:boolean;
  hasUserError:boolean;
 }

export type AccountState = {
  friends: User[]|null;
  orders: Order[]|null;
  coachOrders: OrderCoach[]|null;
  isFriendsLoading:boolean;
  isOrdersLoading:boolean;
 }

export type WorkoutState = {
  workouts: Workout[]|null;
  workout: Workout|null;
  reviews: Review[]|null;
  specialOfferWorkouts: Workout[]|null;
  popularWorkouts: Workout[]|null;
  totalAmount:number;
  maxPrice:number;
  specialUserWorkouts: Workout[]|null;
  isWorkoutsLoading:boolean;
  isWorkoutLoading:boolean;
  isReviewsLoading:boolean;
 }
