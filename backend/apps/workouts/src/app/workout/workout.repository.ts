import {
  WorkoutByCoachQuery,
  WorkoutListQuery,
} from '@backend/shared-quieries';
import { Workout } from '@backend/shared/shared-types';
import { DefaultParam } from '@backend/util/util-core';
import { CRUDRepository } from '@backend/util/util-types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { adaptPrismaWorkout } from '../utils/adapt-prisma-workout';
import { adaptWorkoutToPrisma } from '../utils/adapt-workout-to-prisma';
import { WorkoutEntity } from './workout.entity';

@Injectable()
export class WorkoutRepository
  implements CRUDRepository<WorkoutEntity, number, Workout>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: WorkoutEntity): Promise<Workout> {
    const data = adaptWorkoutToPrisma(item);
    const workout = await this.prisma.workout.create({ data });
    return adaptPrismaWorkout(workout);
  }

  public async findByCoach(
    coachId: number,
    {
      limit,
      page,
      sortDirection,
      workoutTime,
      caloriesMin,
      caloriesMax,
      priceMin,
      priceMax,
      rating,
      sortBy,
    }: WorkoutByCoachQuery
  ): Promise<Workout[] | null> {
    const queryParams = {
      where: {
        AND: {
          coachId,
          calories: { gte: caloriesMin, lte: caloriesMax },
          price: { gte: priceMin, lte: priceMax },
          rating: { gte: rating },
          workoutTime: undefined,
        },
      },
      take: limit,
      orderBy: [{ [sortBy]: sortDirection }],
      skip:
        page > DefaultParam.Amount
          ? limit * (page - DefaultParam.Step)
          : undefined,
    };
    if (workoutTime) {
      queryParams.where.AND.workoutTime = { search: workoutTime };
    }
    const workouts = await this.prisma.workout.findMany(queryParams);
    return workouts.map((workout) => adaptPrismaWorkout(workout));
  }

  public async getFullList(): Promise<Workout[]> {
    const workouts = await this.prisma.workout.findMany();
    return workouts.map((workout) => adaptPrismaWorkout(workout));
  }

  public async findAll({
    limit,
    page,
    sortDirection,
    workoutType,
    caloriesMin,
    caloriesMax,
    priceMin,
    priceMax,
    rating,
    sortBy,
  }: WorkoutListQuery): Promise<Workout[]> {
    const queryParams = {
      where: {
        AND: {
          calories: { gte: caloriesMin, lte: caloriesMax },
          price: { gte: priceMin, lte: priceMax },
          rating: { gte: rating },
          workoutType: undefined,
        },
      },
      take: limit,
      orderBy: [{ [sortBy]: sortDirection }],
      skip:
        page > DefaultParam.Amount
          ? limit * (page - DefaultParam.Step)
          : undefined,
    };
    if (workoutType) {
      queryParams.where.AND.workoutType = { hasSome: workoutType };
    }
    const workouts = await this.prisma.workout.findMany(queryParams);

    return workouts.map((workout) => adaptPrismaWorkout(workout));
  }

  public async findById(workoutId: number): Promise<Workout | null> {
    const workout = await this.prisma.workout.findFirst({
      where: {
        workoutId,
      },
    });
    return adaptPrismaWorkout(workout);
  }

  public async update(
    workoutId: number,
    item: WorkoutEntity
  ): Promise<Workout> {
    const data = adaptWorkoutToPrisma(item);
    const workout = await this.prisma.workout.update({
      where: { workoutId },
      data,
    });
    return adaptPrismaWorkout(workout);
  }

  public async destroy(workoutId: number): Promise<void> {
    await this.prisma.workout.delete({ where: { workoutId } });
  }
}
