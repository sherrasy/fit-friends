export const ControllerName = {
  User: 'users',
  Workouts: 'workouts',
  Uploader: 'uploads',
} as const;

export const AppPath = {
  Register: 'register',
  Login: 'login',
  Refresh: 'refresh',
  Check: 'check',
  CheckAuth: 'check-auth',
  CheckLogin: 'check-login',
  CheckEmail: 'check-email',
  Revoke: 'revoke',
  Show: 'show',
  Id: ':id',
  Subscribe: 'subscribe',
  Update: 'update',
  Upload: 'upload',
  CoachList: 'coach-list',
  Add: 'add',
  SendNewsletter: 'send-workouts',
  Notifications: 'notifications',
  Requests: 'requests',
  Friends: 'friends',
  File: 'file',
} as const;

export const FileType = {
  Avatar: 'avatar',
  UserPhoto: 'user-photo',
  WorkoutPhoto: 'workout-photo',
  Certificate: 'certificate',
  Video: 'video',
} as const;

export const UserMessages = {
  NotFound : 'User is not found',
  UserUpdate : 'User updated',
  InvalidData: 'Data is invalid',
  Register : "User registered successfully",
  Login: "Login successfull",
  UserFound: "User data found",
  Refresh: 'Get a new access/refresh tokens',
  AvatarAdded: "Avatar added successfully",
  PhotoAdded: "Photo added successfully"
} as const;


