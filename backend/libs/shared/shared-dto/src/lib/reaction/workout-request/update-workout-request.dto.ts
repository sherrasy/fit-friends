import { StatusRequest } from '@backend/shared/shared-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateWorkoutRequestDto {
  @ApiProperty({
    description: 'Current status of the request',
    enum: StatusRequest,
  })
  public statusRequest: StatusRequest;
}
