export const  API_TAG_NAME ='workout'

export const WorkoutError = {
  WorkoutNotFound : 'Workout is not found',
  NotCoachAuthor : 'Workout is not belonging to this coach id',
} as const;

export const WorkoutMessage = {
  Add : "Workout added successfully",
  Show : "Workout is showing",
  Update : "Workout updated",
} as const;

export const WorkoutPath = {
  Main:'workout',
  Add:'add',
  Id: ':id'
}as const;
