import { Controller, HttpStatus, UseGuards, UseInterceptors, Post, Patch, Param, Req, Body } from '@nestjs/common';
import { API_TAG_NAME, WorkoutRequestMessages, WorkoutRequestPath } from './workout-request.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkoutRequestService } from './workout-request.service';
import { UserRoleInterceptor } from '@backend/shared-interceptors';
import { JwtAuthGuard, fillObject } from '@backend/util/util-core';
import { WorkoutRequestRdo } from './rdo/workout-request.rdo';
import { RequestWithUserPayload } from '@backend/shared/shared-types';
import { CreateWorkoutRequestDto, UpdateWorkoutRequestDto } from '@backend/shared/shared-dto';

@ApiTags(API_TAG_NAME)
@Controller(WorkoutRequestPath.Main)
export class WorkoutRequestController {
  constructor(
    private readonly workoutRequestService: WorkoutRequestService,
  ) {}

  @ApiResponse({
    status:HttpStatus.CREATED,
    description: WorkoutRequestMessages.Add
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(UserRoleInterceptor)
  @Post()
  public async addRequest( @Req() {user}: RequestWithUserPayload, @Body() dto:CreateWorkoutRequestDto) {
    const userId = user.sub;
    const newRequest = await this.workoutRequestService.addRequest(userId, dto);
    return fillObject( WorkoutRequestRdo,newRequest);
  }

  @ApiResponse({
    status:HttpStatus.CREATED,
    description: WorkoutRequestMessages.Add
  })
  @UseGuards(JwtAuthGuard)
  @Patch(WorkoutRequestPath.Id)
  public async updateRequestStatus( @Param('id') id:number,  @Body() dto:UpdateWorkoutRequestDto) {
    const request = await this.workoutRequestService.updateRequestStatus(id, dto);
    return fillObject( WorkoutRequestRdo,request);
  }


}
