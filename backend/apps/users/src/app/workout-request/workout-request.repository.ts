import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkoutRequestEntity } from './workout-request.entity';
import { StatusRequest, WorkoutRequest } from '@backend/shared/shared-types';

@Injectable()
export class WorkoutRequestRepository {
  constructor(private readonly prisma: PrismaService) { }

  public async create(item: WorkoutRequestEntity): Promise<WorkoutRequest> {
    const data = { ...item.toObject() };
    const request = await this.prisma.workoutRequest.create({ data });
    return {
      ...request,
      statusRequest: request.statusRequest as StatusRequest,
    };
  }

  public async findById(id: number): Promise<WorkoutRequest | null> {
    const request = await this.prisma.workoutRequest.findFirst({
      where: { id },
    });
    return {
      ...request,
      statusRequest: request.statusRequest as StatusRequest,
    };
  }

  public async update(id: number, item: WorkoutRequestEntity) {
    const data = { ...item.toObject() };
    const request = await this.prisma.workoutRequest.update({
      where: { id },
      data
    });
    return {
      ...request,
      statusRequest: request.statusRequest as StatusRequest,
    };
  }
}
