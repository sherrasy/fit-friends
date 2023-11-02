import {
  CoachRoleInterceptor,
  UserRoleInterceptor,
} from '@backend/shared-interceptors';
import {
  WorkoutByCoachQuery,
  WorkoutListQuery,
} from '@backend/shared-quieries';
import { RequestWithUserPayload } from '@backend/shared/shared-types';
import { JwtAuthGuard, fillObject } from '@backend/util/util-core';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotifyService } from '../notify/notify.service';
import { WorkoutRdo } from '../workout/rdo/workout.rdo';
import {
  API_TAG_NAME,
  WorkoutsListError,
  WorkoutsListMessage,
  WorkoutsListPath,
} from './workouts-list.constant';
import { WorkoutsListService } from './workouts-list.service';

@ApiTags(API_TAG_NAME)
@Controller(WorkoutsListPath.Main)
export class WorkoutsListController {
  constructor(
    private readonly workoutsListService: WorkoutsListService,
    private readonly notifyService: NotifyService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: WorkoutsListMessage.ShowAll,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: WorkoutsListError.EmptyList,
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  public async show(@Query() query: WorkoutListQuery) {
    const workouts = await this.workoutsListService.showAll(query);
    return workouts.map((workout) => fillObject(WorkoutRdo, workout));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: WorkoutsListMessage.ShowAll,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: WorkoutsListError.EmptyList,
  })
  @UseGuards(JwtAuthGuard)
  @Get(WorkoutsListPath.CoachList)
  @UseInterceptors(CoachRoleInterceptor)
  public async showByCoach(
    @Req() { user }: RequestWithUserPayload,
    @Query() query: WorkoutByCoachQuery
  ) {
    const coachId = user.sub;
    const workouts = await this.workoutsListService.findByCoachId(
      coachId,
      query
    );
    return workouts.map((workout) => fillObject(WorkoutRdo, workout));
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: WorkoutsListMessage.NewsSent,
  })
  @UseGuards(JwtAuthGuard)
  @Get(WorkoutsListPath.SendNewsletter)
  @UseInterceptors(UserRoleInterceptor)
  public async sendNews(@Req() { user }: RequestWithUserPayload) {
    const { email } = user;
    const workouts = await this.workoutsListService.getWorkouts();
    this.notifyService.sendNewsletter({ email, workouts });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: WorkoutsListMessage.ShowSingle,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: WorkoutsListError.EmptyList,
  })
  @UseGuards(JwtAuthGuard)
  @Get(WorkoutsListPath.Id)
  public async showById(@Param('id') id: number) {
    const workout = await this.workoutsListService.findByWorkoutId(id);
    return fillObject(WorkoutRdo, workout);
  }
}
