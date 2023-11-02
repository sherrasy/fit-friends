export const API_TAG_NAME = 'workout-request';

export const WorkoutRequestError = {
  NotFound: 'Request is not found',
  InvalidUser: 'User is not found',
  StatusSame: 'Status is already the same',
} as const;

export const WorkoutRequestMessage = {
  Update: 'Request status updated',
  Add: 'Request added',
} as const;

export const WorkoutRequestPath = {
  Main: 'workout-request',
  Id: ':id',
} as const;
