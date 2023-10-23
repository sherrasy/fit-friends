import { FitnessLevel, PrismaWorkout, UserSex, WorkoutTime, WorkoutType } from "@backend/shared/shared-types";

export function adaptPrismaWorkout (prismaWorkout:PrismaWorkout){
  if (prismaWorkout) {
    const user = {
      ...prismaWorkout,
      createdDate: prismaWorkout.createdDate.toISOString(),
      sex: prismaWorkout.sex as UserSex,
      fitnessLevel: prismaWorkout.fitnessLevel as FitnessLevel,
      workoutType: prismaWorkout.workoutType.map((item)=> item as WorkoutType),
      workoutTime: prismaWorkout.workoutTime as WorkoutTime,

    };

    return user;

  }
  return null;
}
