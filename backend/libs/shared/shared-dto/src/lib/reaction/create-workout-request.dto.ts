import { ApiProperty } from "@nestjs/swagger";
import { StatusRequest } from "@backend/shared/shared-types";

export class CreateWorkoutRequestDto {
  @ApiProperty({
    description: 'User Id'
  })
  public userId: string;

  @ApiProperty({
    description: 'Current status of the request',
    enum: StatusRequest, enumName: 'StatusRequest'})
  public statusRequest: StatusRequest;
}
