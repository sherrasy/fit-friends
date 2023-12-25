export enum ApplicationServiceURL {
  Users = '/api/auth',
  UserInfo = '/api/user-info',
  UserFriends = '/api/friends',
  UserNotifications = '/api/user-notifications',
  WorkoutRequest = '/api/workout-request',
  WorkoutInfo = '/api/workout',
  WorkoutsList = '/api/workouts-list',
  OrdersList = '/api/orders',
  ReviewsList = '/api/reviews',
  Uploader = '/api/files',
}

export const HttpCLientParam = {
  MaxRedirects: 5,
  Timeout: 5000,
} as const
