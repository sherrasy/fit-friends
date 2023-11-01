export const SALT_ROUNDS = 10;

export const API_TAG_NAME = 'user-info';

export const UserInfoError = {
  NotFound: 'User info is not found',
  EmptyList: 'User list is empty',
  NotCoach: 'User is not coach',
} as const;

export const UserInfoMessages = {
  UserFound: 'User data found',
  UserList: 'User list is showing',
} as const;

export const UserInfoPath = {
  Main: 'user-info',
  Id: ':id',
  Show: 'show',
  Subscribe: 'subscribe',
  Update: 'update',
} as const;
