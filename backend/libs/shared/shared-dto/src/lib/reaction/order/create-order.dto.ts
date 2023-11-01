import { PaymentOption } from '@backend/shared/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Matches, Max, Min } from 'class-validator';
import { DEFAULT_ORDER_TYPE, WorkoutsAmount } from '../../constant';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Workout Id',
  })
  @IsInt()
  public workoutId: number;

  @ApiProperty({
    description: 'Workout count',
  })
  @IsInt()
  @Min(WorkoutsAmount.Min)
  @Max(WorkoutsAmount.Max)
  public amount: number;

  @ApiProperty({
    description: 'Payment method',
    enum: PaymentOption,
  })
  public paymentOption: PaymentOption;

  @ApiProperty({
    description: 'Order type',
  })
  @Matches(DEFAULT_ORDER_TYPE)
  public orderType: string;
}
