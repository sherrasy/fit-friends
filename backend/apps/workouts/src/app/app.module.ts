import { Module } from '@nestjs/common';
import { WorkoutModule } from './workout/workout.module';
import { WorkoutsListModule } from './workouts-list/workouts-list.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigWorkoutsModule } from '@backend/config/config-workouts';
import { WorkoutsOrdersModule } from './workouts-order/workouts-order.module';
import { NotifyModule } from './notify/notify.module';
import { WorkoutRequestModule } from './workout-request/workout-request.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    WorkoutModule,
    WorkoutsListModule,
    PrismaModule,
    ConfigWorkoutsModule,
    WorkoutsOrdersModule,
    NotifyModule,
    WorkoutRequestModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
