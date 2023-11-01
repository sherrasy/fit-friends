import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReviewsRdo {
  @ApiProperty({
    description: 'Review id',
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Text review',
  })
  @Expose()
  public message: string;

  @ApiProperty({
    description: 'Rating workout',
  })
  @Expose()
  public rating: number;

  @Expose()
  public createdDate: Date;
}
