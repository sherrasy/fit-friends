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
}
