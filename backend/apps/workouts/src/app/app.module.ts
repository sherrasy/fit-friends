import { Module } from '@nestjs/common';
import { WorkoutModule } from './workout/workout.module';
import { WorkoutsListModule } from './workouts-list/workouts-list.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigWorkoutsModule } from '@backend/config/config-workouts';
import { OrdersModule } from './orders/orders.module';
import { NotifyModule } from './notify/notify.module';
import { ReviewsModule } from './reviews/reviews.module';

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
