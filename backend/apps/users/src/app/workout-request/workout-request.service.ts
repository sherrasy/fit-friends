import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { WorkoutRequestRepository } from './workout-request.repository';
import { UserInfoRepository } from '../user-info/user-info.repository';
import {
  CreateWorkoutRequestDto,
  UpdateWorkoutRequestDto,
} from '@backend/shared/shared-dto';
import { WorkoutRequestError } from './workout-request.constant';
import { WorkoutRequestEntity } from './workout-request.entity';
import { NotificationText, StatusRequest, UserRole } from '@backend/shared/shared-types';
import { UserNotificationsRepository } from '../user-notifications/user-notifications.repository';

@Injectable()
export class WorkoutRequestService {
  constructor(
    private readonly workoutRequestRepository: WorkoutRequestRepository,
    private readonly userInfoRepository: UserInfoRepository,
    private readonly notificationRepository: UserNotificationsRepository,
  ) {}

  public async addRequest(
    initiatorId: number,
    { userId }: CreateWorkoutRequestDto
  ) {
    const user = await this.userInfoRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(WorkoutRequestError.InvalidUser);
    }
    const request = {
      userId,
      initiatorId,
      statusRequest: StatusRequest.Pending,
    };
    const requestEntity = new WorkoutRequestEntity(request);
    const requestInfo = await this.workoutRequestRepository.create(requestEntity);
    const text = user.role === UserRole.Coach?NotificationText.Personal : NotificationText.Request;
    const notification = {userId, text}
    await this.notificationRepository.create(notification)
    return requestInfo;
  }

  public async updateRequestStatus(
    id: number,
    { statusRequest }: UpdateWorkoutRequestDto
  ) {
    const request = await this.workoutRequestRepository.findById(id);
    if (!request) {
      throw new NotFoundException(WorkoutRequestError.NotFound);
    }
    if(request.statusRequest === statusRequest){
      throw new BadRequestException(WorkoutRequestError.NotFound);
    }
    const updatedRequest = { ...request, statusRequest };
    const requestEntity = new WorkoutRequestEntity(updatedRequest);
    return this.workoutRequestRepository.update(id, requestEntity);
  }
}
