import { UserRoleInterceptor } from '@backend/shared-interceptors';
import { ReviewsQuery } from '@backend/shared-quieries';
import { CreateReviewDto } from '@backend/shared/shared-dto';
import { RequestWithUserPayload, Review } from '@backend/shared/shared-types';
import { JwtAuthGuard, fillObject } from '@backend/util/util-core';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewsRdo } from './rdo/reviews.rdo';
import { API_TAG_NAME, ReviewsMessage, ReviewsPath } from './reviews.constant';
import { ReviewsService } from './reviews.service';

@ApiTags(API_TAG_NAME)
@Controller(ReviewsPath.Main)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ReviewsMessage.Add,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UserRoleInterceptor)
  @Post(ReviewsPath.Id)
  public async addReview(
    @Param('id') workoutId: number,
    @Req() { user }: RequestWithUserPayload,
    @Body() dto: CreateReviewDto
  ) {
    const userId = user.sub;
    const newReview = await this.reviewsService.addReview(
      workoutId,
      userId,
      dto
    );
    return fillObject(ReviewsRdo, newReview);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ReviewsMessage.Show,
  })
  @UseGuards(JwtAuthGuard)
  @Get(ReviewsPath.Id)
  public async showReviews(
    @Param('id') workoutId: number,
    @Query() query: ReviewsQuery
  ) {
    const reviewsInfo = await this.reviewsService.showReviews(workoutId, query);
    return reviewsInfo.map((item: Review) => fillObject(ReviewsRdo, item));
  }
}
