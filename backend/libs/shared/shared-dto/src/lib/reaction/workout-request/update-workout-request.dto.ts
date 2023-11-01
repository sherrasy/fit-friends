
import { ApiProperty } from "@nestjs/swagger";
import { StatusRequest } from "@backend/shared/shared-types";

export class UpdateWorkoutRequestDto {
  @ApiProperty({
    description: 'Current status of the request',
    enum: StatusRequest
  })
  public statusRequest: StatusRequest;
}
