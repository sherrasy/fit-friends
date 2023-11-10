export const AppRoute = {
  Main: '/',
  Intro: '/intro',
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
  CheckLogin: '/users/check-login',
  Register: '/users/register',
} as const;

export const ApiConnectParam = {
  Url:'http://localhost:4000/api',
  Timeout: 5000
};

export const ApiErrorsMessage = {
  Unauthorized: 'You\'re not logged in. Some features are not available',
  FetchPagesError:'Can`t get pages data'
} as const;

export const ValidationPattern = {
  Email: /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/,
  Password: /^(?=.*[A-Za-z0-9])(?=.*\d)[A-Za-z\d0-9]{6,12}$/,
  Name: /^[a-zA-Zа-яА-Я]{1,15}$/,
} as const;

export const UserFormFieldName = {
  Email:'email',
  Password:'password'
} as const;
