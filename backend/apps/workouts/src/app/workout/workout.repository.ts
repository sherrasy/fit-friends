import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CRUDRepository } from '@backend/util/util-types';
import { WorkoutEntity } from './workout.entity';
import { Workout } from '@backend/shared/shared-types';
import { adaptPrismaWorkout } from './utils/adapt-prisma-workout';
import { adaptWorkoutToPrisma } from './utils/adapt-workout-to-prisma';


@Injectable()
export class WorkoutRepository implements CRUDRepository <WorkoutEntity, number, Workout> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: WorkoutEntity): Promise<Workout> {
    const data = adaptWorkoutToPrisma(item)
    const workout = await this.prisma.workout.create({ data });
    return adaptPrismaWorkout(workout)
  }

  public async findById(workoutId: number): Promise<Workout | null> {
    const workout = await this.prisma.workout.findFirst({
      where: {
        workoutId
      }
    });
    return adaptPrismaWorkout(workout)
  }

  public async findByCoach(coachId: number): Promise<Workout[] | null> {
    const workouts = await this.prisma.workout.findMany({
      where: {
        coachId
      }
    });
    return workouts.map((workout) => adaptPrismaWorkout(workout))
}


  // public async findAll({ limit, page, sortBy, type, sortDirection }: Query): Promise<Workout[]> {
  //   const queryParams = {
  //     where: {
  //       AND: {
  //         status: WorkoutStatus,
  //         type: type as WorkoutType,
  //       }
  //     },
  //     take: limit,
  //     orderBy: [
  //       { ['price']: sortDirection }
  //     ],
  //     skip: page > 0 ? limit * (page - 1) : undefined,
  //   }

  //   const workouts = await this.prisma.workout.findMany(queryParams);
  //   return workouts.map((workout) => adaptPrismaWorkout(workout))
  // }

  public async update(workoutId: number, item: WorkoutEntity): Promise<Workout> {
    const data = adaptWorkoutToPrisma(item)
    const workout = await this.prisma.workout.update({
      where: { workoutId },
      data,
    });
    return adaptPrismaWorkout(workout)
  }

  public async destroy(workoutId: number): Promise<void> {
    await this.prisma.workout.delete({ where: { workoutId } });
  }
}

