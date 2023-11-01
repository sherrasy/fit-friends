export const API_TAG_NAME = 'user-notifications';

export const NOTIFICATIONS_ERROR = 'Notification is not found';

export const NotificationsMessages = {
  Show: 'Notification list is showing',
  Remove: 'Notification removed',
} as const;

export const NotificationsPath = {
  Main: 'user-notifications',
  Id: ':id',
} as const;
