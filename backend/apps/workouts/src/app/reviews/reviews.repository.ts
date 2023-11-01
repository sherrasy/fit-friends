import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Review } from '@backend/shared/shared-types';
import { ReviewsEntity } from './reviews.entity';

@Injectable()
export class ReviewsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: ReviewsEntity): Promise<Review> {
    const data = item.toObject();
    return await this.prisma.review.create({ data });
  }

  public async findAllByWorkoutId(workoutId: number): Promise<Review[] | null> {
    return await this.prisma.review.findMany({
      where: {
        workoutId,
      },
    });
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
