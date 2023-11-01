import { ConfigWorkoutsModule } from '@backend/config/config-workouts';
import { Module } from '@nestjs/common';
import { NotifyModule } from './notify/notify.module';
import { OrdersModule } from './orders/orders.module';
import { PrismaModule } from './prisma/prisma.module';
import { ReviewsModule } from './reviews/reviews.module';
import { WorkoutModule } from './workout/workout.module';
import { WorkoutsListModule } from './workouts-list/workouts-list.module';

@Module({
  imports: [
    WorkoutModule,
    WorkoutsListModule,
    PrismaModule,
    ConfigWorkoutsModule,
    OrdersModule,
    NotifyModule,
    ReviewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
