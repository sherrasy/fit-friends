import { Injectable } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { ReviewsEntity } from './reviews.entity';
import { CreateReviewDto } from '@backend/shared/shared-dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}

  public async addReview(
    workoutId: number,
    userId: number,
    dto: CreateReviewDto
  ) {
    //rating count + workout check
    const review = {
      userId,
      workoutId,
      ...dto,
    };
    const reviewEntity = new ReviewsEntity(review);
    const reviewInfo = await this.reviewsRepository.create(reviewEntity);
    return reviewInfo;
  }

  public async showReviews(workoutId: number) {
        // workout check
    return await this.reviewsRepository.findAllByWorkoutId(workoutId);
  }

}
