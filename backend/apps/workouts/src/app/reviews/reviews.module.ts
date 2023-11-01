import { JwtAccessStrategy, getJwtOptions } from '@backend/util/util-core';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { WorkoutModule } from '../workout/workout.module';
import { ReviewsController } from './reviews.controller';
import { ReviewsRepository } from './reviews.repository';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    }),
    WorkoutModule,
  ],
  providers: [ReviewsService, ReviewsRepository, JwtAccessStrategy],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
