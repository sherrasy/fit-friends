import { Workout } from '@backend/shared/shared-types';
import { WorkoutByCoachQuery, WorkoutListQuery } from '@backend/shared-quieries';
import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkoutRepository } from '../workout/workout.repository';
import { WorkoutsListError } from './workouts-list.constant';

@Injectable()
export class WorkoutsListService {
  constructor(
    private readonly workoutRepository: WorkoutRepository
  ) {}

  public async showAll(query:WorkoutListQuery): Promise<Workout[]> {
    return this.workoutRepository.findAll(query);
  }

  public async findByCoachId(coachId:number, query:WorkoutByCoachQuery): Promise<Workout[]> {
    return this.workoutRepository.findByCoach(coachId, query);
  }

  public async findByWorkoutId(id: number) {
    const workout  = await this.workoutRepository.findById(id);
    if (!workout) {
      throw new NotFoundException(WorkoutsListError.WorkoutNotFound);
    }
    return workout;
  }

  public async getWorkouts (): Promise<Workout[]> {
    return this.workoutRepository.getFullList();
  }
}
