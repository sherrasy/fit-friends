import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewsRepository } from './reviews.repository';
import { ReviewsEntity } from './reviews.entity';
import { CreateReviewDto } from '@backend/shared/shared-dto';
import { WorkoutRepository } from '../workout/workout.repository';
import { REVIEWS_ERROR } from './reviews.constant';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly reviewsRepository: ReviewsRepository,
    private readonly workoutRepository: WorkoutRepository,
    ) {}

  public async addReview(
    workoutId: number,
    userId: number,
    dto: CreateReviewDto
  ) {
    const workout = await this.workoutRepository.findById(workoutId)
    if(!workout){
      throw new NotFoundException(REVIEWS_ERROR)
    }
    const review = {
      userId,
      workoutId,
      ...dto,
    };
    const reviewEntity = new ReviewsEntity(review);
    const reviewInfo = await this.reviewsRepository.create(reviewEntity);
    await this.reviewsRepository.updateRating(workoutId)
    return reviewInfo;
  }

  public async showReviews(workoutId: number) {
    const workout = await this.workoutRepository.findById(workoutId)
    if(!workout){
      throw new NotFoundException(REVIEWS_ERROR)
    }
    return await this.reviewsRepository.findAllByWorkoutId(workoutId);
  }

}
