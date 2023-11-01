import { Controller, HttpStatus,UseGuards, UseInterceptors, Post, Param,Req, Body, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { API_TAG_NAME, ReviewsMessages, ReviewsPath } from './reviews.constant';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard, fillObject } from '@backend/util/util-core';
import { ReviewsRdo } from './rdo/reviews.rdo';
import { UserRoleInterceptor } from '@backend/shared-interceptors';
import { RequestWithUserPayload, Review } from '@backend/shared/shared-types';
import { CreateReviewDto } from '@backend/shared/shared-dto';
import { ReviewsQuery } from '@backend/shared-quieries';

@ApiTags(API_TAG_NAME)
@Controller(ReviewsPath.Main)
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
  ) {}

  @ApiResponse({
    status:HttpStatus.CREATED,
    description: ReviewsMessages.Add
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UserRoleInterceptor)
  @Post(ReviewsPath.Id)
  public async addReview(  @Param('id') workoutId:number, @Req() {user}: RequestWithUserPayload, @Body() dto:CreateReviewDto) {
    const userId = user.sub;
    const newReview = await this.reviewsService.addReview(workoutId,userId, dto);
    return fillObject( ReviewsRdo,newReview);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: ReviewsMessages.Show,
  })
  @UseGuards(JwtAuthGuard)
  @Get(ReviewsPath.Id)
  public async showReviews( @Param('id') workoutId:number, @Query() query:ReviewsQuery) {
    const reviewsInfo = await this.reviewsService.showReviews(workoutId, query);
    return reviewsInfo.map((item:Review)=>fillObject(ReviewsRdo, item));
  }

}
