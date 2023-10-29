import { Controller, Get, HttpStatus, Param, Query, Req, UseInterceptors,UseGuards } from '@nestjs/common';
import { API_TAG_NAME, WorkoutsListError, WorkoutsListMessages, WorkoutsListPath } from './workouts-list.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkoutsListService } from './workouts-list.service';
import { JwtAuthGuard, fillObject } from '@backend/util/util-core';
import { WorkoutRdo } from '../workout/rdo/workout.rdo';
import { WorkoutByCoachQuery, WorkoutListQuery } from '@backend/shared-quieries';
import { CoachRoleInterceptor } from '@backend/shared-interceptors';
import { RequestWithUserPayload } from '@backend/shared/shared-types';

@ApiTags(API_TAG_NAME)
@Controller(WorkoutsListPath.Main)
export class WorkoutsListController {
  constructor(
    private readonly workoutsListService: WorkoutsListService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: WorkoutsListMessages.ShowAll
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: WorkoutsListError.EmptyList
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  public async show(@Query() query:WorkoutListQuery) {
    const workouts = await this.workoutsListService.showAll(query);
    return workouts.map((workout) => fillObject(WorkoutRdo, workout) );
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: WorkoutsListMessages.ShowSingle
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: WorkoutsListError.WorkoutNotFound
  })
  @UseGuards(JwtAuthGuard)
  @Get(WorkoutsListPath.CoachList)
  @UseInterceptors(CoachRoleInterceptor)
    public async showByCoach(@Req() { user }: RequestWithUserPayload, @Query() query:WorkoutByCoachQuery) {
    const coachId = user.sub;
    const workout = await this.workoutsListService.findByCoachId(coachId, query);
    return fillObject(WorkoutRdo, workout);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: WorkoutsListMessages.ShowAll
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: WorkoutsListError.EmptyList
  })
  @UseGuards(JwtAuthGuard)
  @Get(WorkoutsListPath.Id)
  public async showById(@Param('id') id: number) {
    const workout = await this.workoutsListService.findByWorkoutId(id);
    return fillObject(WorkoutRdo, workout);
  }

}
