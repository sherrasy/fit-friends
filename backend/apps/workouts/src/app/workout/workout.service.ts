import { CreateWorkoutDto, UpdateWorkoutDto } from '@backend/shared/shared-dto';
import { DefaultParam, getDate } from '@backend/util/util-core';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WorkoutError } from './workout.constant';
import { WorkoutEntity } from './workout.entity';
import { WorkoutRepository } from './workout.repository';

@Injectable()
export class WorkoutService {
  constructor(private readonly workoutRepository: WorkoutRepository) {}

  public async create(dto: CreateWorkoutDto, coachId: number) {
    const workout = {
      ...dto,
      coachId,
      createdDate: getDate(),
      rating: DefaultParam.Amount,
      amountOrdered: DefaultParam.Amount,
      priceOrdered: DefaultParam.Amount,
    };
    const workoutEntity = new WorkoutEntity(workout);

    return this.workoutRepository.create(workoutEntity);
  }

  public async update(
    workoutId: number,
    dto: UpdateWorkoutDto,
    coachId: number
  ) {
    const workout = await this.findByWorkoutId(workoutId);
    if (coachId !== workout.coachId) {
      throw new BadRequestException(WorkoutError.NotCoachAuthor);
    }
    const updatedWorkout = { ...workout, ...dto };
    const workoutEntity = new WorkoutEntity(updatedWorkout);
    return this.workoutRepository.update(workoutId, workoutEntity);
  }

  public async findByWorkoutId(id: number) {
    const workout = await this.workoutRepository.findById(id);
    if (!workout) {
      throw new NotFoundException(WorkoutError.WorkoutNotFound);
    }
    return workout;
  }
}
