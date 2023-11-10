export const AppRoute = {
  Main: '/',
  Login: '/login',
  Register: '/register',
  AddWorkout: '/add-workout',
  EditWorkout: '/edit-workout',
  CoachAccount: '/coach-account',
  UserAccount: '/user-account',
  CoachFriends: '/coach-friends',
  UserFriends: '/user-friends',
  UserInfo: '/user-info',
  WorkoutInfo: '/workout-info',
  Orders: '/orders',
  Purchases: '/Purchases',
  CoachWorkouts: '/coach-workouts',
  Questionnaire: '/questionnaire',
  UserList:'user-list',
  WorkoutsList:'workouts-list',
  Error: '*',
} as const;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const ReducerName = {
  User: 'USER',
  Workout: 'WORKOUT',
} as const;

export const ActionName = {
  CheckAuth: 'checkAuth',
  Login: 'login',
  Register: 'register',
  Redirect: 'app/redirectToRoute',
} as const;

export const ApiRoute = {
  Login: '/users/login',
  Register: '/users/register',
} as const;

export const ApiConnectParam = {
  Url:'http://localhost:4000',
  Timeout: 5000
};

export const ApiErrorsMessage = {
  Unauthorized: 'You\'re not logged in. Some features are not available',
  FetchPagesError:'Can`t get pages data'
} as const;

export const ValidationPattern = {
  Email: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
  Password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/,
  Name: /^[a-zA-Zа-яА-Я]{1,15}$/,
} as const;

export const VALIDATION_ERROR_NAME = 'VALIDATION_ERROR';
