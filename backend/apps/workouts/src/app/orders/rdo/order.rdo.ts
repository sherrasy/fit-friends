import { PaymentOption, Workout } from "@backend/shared/shared-types";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class OrderRdo {
  @ApiProperty({
    description: 'Order Id'
  })
  @Expose({name:'id'})
  public orderId: number;

  @ApiProperty({
    description: 'Workout Id'
  })
  @Expose()
  public workoutId: number;

  @ApiProperty({
    description: 'Workout count'
  })
  @Expose()
  public amount: number;

  @ApiProperty({
    description: 'Workout done count'
  })
  @Expose()
  public amountDone: number;

  @ApiProperty({
    description: 'Workout price'
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Workout total price'
  })
  @Expose()
  public totalPrice: number;

  @ApiProperty({
    description: 'Payment method',
    enum: PaymentOption})
    @Expose()
  public paymentOption: PaymentOption;

  @ApiProperty({
    description: 'Order type',
})
@Expose()
  public orderType: string;

  @ApiProperty({
    description: 'Workout info',
})
@Expose()
  public workout: Workout;


}
