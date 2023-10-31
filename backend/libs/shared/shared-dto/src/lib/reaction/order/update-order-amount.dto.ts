import { AmountUpdateType } from '@backend/shared/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';

export class UpdateOrderAmountDto {
  @ApiProperty({
    description: 'Order Id',
  })
  @IsInt()
  public orderId: number;

  @ApiProperty({
    description: 'Order amount change type',
    enum: AmountUpdateType,
  })
  @IsEnum(AmountUpdateType)
  public updateType: AmountUpdateType;
}
