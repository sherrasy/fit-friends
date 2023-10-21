import { Module } from '@nestjs/common';
import { WorkoutsListController } from './workouts-list.controller';
import { WorkoutsListService } from './workouts-list.service';

@Module({
  controllers: [WorkoutsListController],
  providers: [WorkoutsListService],
})
export class WorkoutsListModule {}
