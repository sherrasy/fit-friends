import { UserRoleInterceptor } from '@backend/shared-interceptors';
import {
  CreateWorkoutRequestDto,
  UpdateWorkoutRequestDto,
} from '@backend/shared/shared-dto';
import { RequestWithUserPayload } from '@backend/shared/shared-types';
import { JwtAuthGuard, fillObject } from '@backend/util/util-core';
import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkoutRequestRdo } from './rdo/workout-request.rdo';
import {
  API_TAG_NAME,
  WorkoutRequestMessage,
  WorkoutRequestPath,
} from './workout-request.constant';
import { WorkoutRequestService } from './workout-request.service';

@ApiTags(API_TAG_NAME)
@Controller(WorkoutRequestPath.Main)
export class WorkoutRequestController {
  constructor(private readonly workoutRequestService: WorkoutRequestService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: WorkoutRequestMessage.Add,
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UserRoleInterceptor)
  @Post()
  public async addRequest(
    @Req() { user }: RequestWithUserPayload,
    @Body() dto: CreateWorkoutRequestDto
  ) {
    const userId = user.sub;
    const newRequest = await this.workoutRequestService.addRequest(userId, dto);
    return fillObject(WorkoutRequestRdo, newRequest);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: WorkoutRequestMessage.Update,
  })
  @UseGuards(JwtAuthGuard)
  @Patch(WorkoutRequestPath.Id)
  public async updateRequestStatus(
    @Param('id') id: number,
    @Body() dto: UpdateWorkoutRequestDto
  ) {
    const request = await this.workoutRequestService.updateRequestStatus(
      id,
      dto
    );
    return fillObject(WorkoutRequestRdo, request);
  }
}
