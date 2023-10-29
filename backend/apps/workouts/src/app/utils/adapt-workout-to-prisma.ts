import { FitnessLevel, WorkoutType } from '@prisma/workouts/client';
import { WorkoutEntity } from '../workout/workout.entity';

export function adaptWorkoutToPrisma(workout: WorkoutEntity) {
  if (workout) {
    const workoutInfo = {
      ...workout.toObject(),
      workoutType: workout.workoutType.map((item) => item as WorkoutType),
      fitnessLevel: workout.fitnessLevel as FitnessLevel,
    };
    return workoutInfo;
  }
  return null;
}
