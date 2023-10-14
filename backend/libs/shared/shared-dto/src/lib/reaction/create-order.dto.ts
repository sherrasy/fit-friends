import { PaymentOption } from "@backend/shared/shared-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Max, Min } from "class-validator";
import { WorkoutsAmount } from "../constant";

export class CreateOrderDto {
  @ApiProperty({
    description: 'Training Id'
  })
  public workoutId: string;

  @ApiProperty({
    description: 'Training count'
  })
  @IsInt()
  @Min(WorkoutsAmount.Min)
  @Max(WorkoutsAmount.Max)
  public amount: number;

  @ApiProperty({
    description: 'Payment method',
    enum: PaymentOption})
  public paymentOption: PaymentOption;
}
