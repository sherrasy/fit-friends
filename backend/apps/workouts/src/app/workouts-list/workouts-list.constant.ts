export const API_TAG_NAME = 'workouts-list';

export const WorkoutsListError = {
  WorkoutNotFound: 'Workout is not found',
  EmptyList: 'There are no workouts that can be loaded',
} as const;

export const WorkoutsListMessage = {
  ShowSingle: 'Workout is showing',
  ShowAll: 'List of workouts is showing',
  NewsSent: 'Workouts sent',
} as const;

export const WorkoutsListPath = {
  Main: 'workouts-list',
  CoachList: 'coach-list',
  Id: ':id',
  SendNewsletter: 'send-workouts',
} as const;
