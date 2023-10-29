import { Module } from '@nestjs/common';
import { WorkoutRequestService } from './workout-request.service';
import { WorkoutRequestController } from './workout-request.controller';

@Module({
  providers: [WorkoutRequestService],
  controllers: [WorkoutRequestController],
})
export class WorkoutRequestModule {}
