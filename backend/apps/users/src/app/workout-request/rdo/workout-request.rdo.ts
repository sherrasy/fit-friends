import { StatusRequest } from "@backend/shared/shared-types";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class WorkoutRequestRdo {
  @ApiProperty({
    description: 'Request Id'
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'User Id'
  })
  @Expose()
  public userId: number;

  @ApiProperty({
    description: 'User initiator id'
  })
  @Expose()
  public initiatorId: number;

  @ApiProperty({
    description: 'Current status of the request',
  })
  @Expose()
  public statusRequest: StatusRequest;

  @Expose()
  public createdDate: Date;

  @Expose()
  public updatedDate: Date
}
