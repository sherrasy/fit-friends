export const SALT_ROUNDS = 10;

export const API_TAG_NAME = 'user-info';

export const UserInfoError = {
  NotFound: 'User info is not found',
  EmptyList: 'User list is empty',
  NotCoach: 'User is not coach',
} as const;

export const UserInfoMessage = {
  UserFound: 'User data found',
  UserList: 'User list is showing',
  UserUpdated: 'User updated successfully',
  AvatarAdded: "Avatar added successfully",
  PhotoAdded: "Photo added successfully"
} as const;

export const UserInfoPath = {
  Main: 'user-info',
  Id: ':id',
  Show: 'show',
  Subscribe: 'subscribe',
  Update: 'update',
  UpdateAvatar: 'upload-avatar',
  UpdatePhoto: 'upload-user-photo',
  UpdateCertificate: 'upload-certificate',
} as const;
