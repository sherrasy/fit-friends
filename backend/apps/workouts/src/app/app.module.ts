import { Module } from '@nestjs/common';
import { WorkoutModule } from './workout/workout.module';
import { WorkoutsListModule } from './workouts-list/workouts-list.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [WorkoutModule, WorkoutsListModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
