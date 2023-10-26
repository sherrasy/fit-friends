import { Module } from '@nestjs/common';
import { WorkoutModule } from './workout/workout.module';
import { WorkoutsListModule } from './workouts-list/workouts-list.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigWorkoutsModule } from '@backend/config/config-workouts';


@Module({
  imports: [WorkoutModule, WorkoutsListModule, PrismaModule, ConfigWorkoutsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
