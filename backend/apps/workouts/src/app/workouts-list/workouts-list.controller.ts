import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { API_TAG_NAME, WorkoutsListError, WorkoutsListMessages, WorkoutsListPath } from './workouts-list.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkoutsListService } from './workouts-list.service';
import { fillObject } from '@backend/util/util-core';
import { WorkoutRdo } from '../workout/rdo/workout.rdo';
import { WorkoutByCoachQuery, WorkoutListQuery } from '@backend/shared-quieries';

@ApiTags(API_TAG_NAME)
@Controller(WorkoutsListPath.Main)
export class WorkoutsListController {
  constructor(
    private readonly workoutsListService: WorkoutsListService,
  ) {}

  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: WorkoutsListMessages.ShowAll
  // })
  // @ApiResponse({
  //   status: HttpStatus.NOT_FOUND,
  //   description: WorkoutsListError.EmptyList
  // })
  // @Get()
  // public async show(@Query() query:WorkoutListQuery) {
  //   const workouts = await this.workoutsListService.showAll(query);
  //   return workouts.map((workout) => fillObject(WorkoutRdo, workout) );
  // }

  @ApiResponse({
    status: HttpStatus.OK,
    description: WorkoutsListMessages.ShowAll
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: WorkoutsListError.EmptyList
  })
  @Get(WorkoutsListPath.Id)
  public async showById(@Param('id') id: number) {
    const workout = await this.workoutsListService.findByWorkoutId(id);
    return fillObject(WorkoutRdo, workout);
  }

  // @ApiResponse({
  //   status: HttpStatus.OK,
  //   description: WorkoutsListMessages.ShowSingle
  // })
  // @ApiResponse({
  //   status: HttpStatus.NOT_FOUND,
  //   description: WorkoutsListError.WorkoutNotFound
  // })
  // @Get(WorkoutsListPath.Id)
  // public async showByCoach(@Param('id') id: number, @Query() query:WorkoutByCoachQuery) {
  //   const workout = await this.workoutsListService.findByCoachId(id);
  //   return fillObject(WorkoutRdo, workout);
  // }

}
