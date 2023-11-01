import { ApiProperty } from '@nestjs/swagger';
import { IsInt, MaxLength, MinLength } from 'class-validator';
import { DescriptionLength } from '../constant';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'User Id',
  })
  @IsInt()
  public userId: number;

  @ApiProperty({
    description: 'Text notification',
  })
  @MinLength(DescriptionLength.Min)
  @MaxLength(DescriptionLength.Max)
  public text: string;
}
