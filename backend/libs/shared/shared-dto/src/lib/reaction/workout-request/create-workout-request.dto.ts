import { ApiProperty } from "@nestjs/swagger";

export class CreateWorkoutRequestDto {
  @ApiProperty({
    description: 'User Id'
  })
  public userId: number;
}
