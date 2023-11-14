export enum ApplicationServiceURL {
  Users = 'http://localhost:3001/api/auth',
  UserInfo = 'http://localhost:3001/api/user-info',
  UserFriends = 'http://localhost:3001/api/friends',
  UserNotifications = 'http://localhost:3001/api/user-notifications',
  WorkoutRequest = 'http://localhost:3001/api/workout-request',
  WorkoutInfo = 'http://localhost:3000/api/workout',
  WorkoutsList = 'http://localhost:3000/api/workouts-list',
 OrdersList = 'http://localhost:3000/api/orders',
 ReviewsList = 'http://localhost:3000/api/reviews',
  Uploader = 'http://localhost:3002/api/files',
}

export const HttpCLientParam = {
  MaxRedirects: 5,
  Timeout: 5000,
} as const
