import { PaymentOption } from "@backend/shared/shared-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsInt, Max, Min } from "class-validator";
import { DEFAULT_MIN_PRICE, WorkoutsAmount } from "../constant";

export class CreateOrderDto {
  @ApiProperty({
    description: 'Workout Id'
  })
  @IsInt()
  public workoutId: number;

  @ApiProperty({
    description: 'Workout count'
  })
  @IsInt()
  @Min(WorkoutsAmount.Min)
  @Max(WorkoutsAmount.Max)
  public amount: number;

  @ApiProperty({
    description: 'Workout price'
  })
  @IsInt()
  @Min(DEFAULT_MIN_PRICE)
  public price: number;

  @ApiProperty({
    description: 'Payment method',
    enum: PaymentOption})
  public paymentOption: PaymentOption;

  @ApiProperty({
    description: 'Order type',
})
@IsIn(['абонемент'])
  public orderType: string;
}
