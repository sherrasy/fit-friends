import { Body, Req, Controller, HttpStatus, Param, Post, Delete, Patch, UseGuards,   UseInterceptors} from '@nestjs/common';
import { API_TAG_NAME, WorkoutError, WorkoutMessage, WorkoutPath } from './workout.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkoutService } from './workout.service';
import { WorkoutRdo } from './rdo/workout.rdo';
import { JwtAuthGuard, fillObject } from '@backend/util/util-core';
import { RequestWithUserPayload } from '@backend/shared/shared-types';
import { CreateWorkoutDto, UpdateWorkoutDto } from '@backend/shared/shared-dto';
import { CoachRoleInterceptor } from '@backend/shared-interceptors';

@ApiTags(API_TAG_NAME)
@Controller(WorkoutPath.Main)
export class WorkoutController {
  constructor(
    private readonly workoutService: WorkoutService
  ) { }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.CREATED,
    description: WorkoutMessage.Add,
  })
  @UseGuards(JwtAuthGuard)
  @Post(WorkoutPath.Add)
  @UseInterceptors(CoachRoleInterceptor)
  public async create(@Req() { user }: RequestWithUserPayload, @Body() dto: CreateWorkoutDto) {
    const userId = user.sub;
    const workout = await this.workoutService.create(dto, userId);
    return fillObject(WorkoutRdo, workout);
  }

  @ApiResponse({
    type: WorkoutRdo,
    status: HttpStatus.OK,
    description: WorkoutMessage.Update,
  })
  @UseGuards(JwtAuthGuard)
  @Patch(WorkoutPath.Id)
  @UseInterceptors(CoachRoleInterceptor)
  public async update(@Req() { user }: RequestWithUserPayload, @Param('id') id: number, @Body() dto: UpdateWorkoutDto) {
    const userId = user.sub;
    const workout = await this.workoutService.update(id, dto, userId);
    return fillObject(WorkoutRdo, workout);
  }
}
