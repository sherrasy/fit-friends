export const DEFAULT_AMOUNT = 0;
export const DEFAULT_STATUS = false;
export const  API_TAG_NAME ='workout'

export const WorkoutError = {
  WorkoutNotFound : 'Workout is not found',
  Delete : 'Workout is not deleted',
  NotCoachAuthor : 'Workout is not belonging to this coach id',
} as const;

export const WorkoutMessage = {
  Add : "Workout added successfully",
  Show : "Workout is showing",
  Update : "Workout updated",
  Remove: "Workout removed"
} as const;

export const WorkoutPath = {
  Main:'workout',
  Add:'add',
  Id: ':id'
}as const;
