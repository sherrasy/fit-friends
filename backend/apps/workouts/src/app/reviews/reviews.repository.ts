import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Review } from '@backend/shared/shared-types';
import { ReviewsEntity } from './reviews.entity';
import { ReviewsQuery } from '@backend/shared-quieries';
import { DefaultParam } from '@backend/util/util-core';

@Injectable()
export class ReviewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: ReviewsEntity): Promise<Review> {
    const data = item.toObject();
    return await this.prisma.review.create({ data });
  }

  public async findAllByWorkoutId(workoutId: number, {limit, sortBy, sortDirection, page}:ReviewsQuery): Promise<Review[] | null> {
    const queryParams = {
      where:{
        workoutId
      },
      take: limit,
      skip: page > DefaultParam.Amount ? limit * (page - DefaultParam.Step) : undefined,
      orderBy: [{ [sortBy]: sortDirection }],
    }
    return await this.prisma.review.findMany(queryParams);
  }

  public async getAverageRating(workoutId: number): Promise<number | null> {
    const aggregations = await this.prisma.review.aggregate({
      where: {
        workoutId,
      },
      _avg: {
        rating: true,
      },
    });
    return aggregations._avg.rating;
  }

  public async updateRating(workoutId: number) {
    const rating = await this.getAverageRating(workoutId);
    await this.prisma.workout.update({
      where: {
        workoutId,
      },
      data: {
        rating,
      },
    });
  }
}
