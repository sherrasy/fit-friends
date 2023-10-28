import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FriendRdo {
  @ApiProperty({
    description: 'The unique friend db ID',
    example: '1'
  })
  @Expose()
  public id: number;
  @ApiProperty({
    description: 'The unique user ID',
    example: '1'
  })
  @Expose()
  public userId: number;
  @ApiProperty({
    description: 'The unique user friend ID',
    example: '1'
  })
  @Expose()
  public friendId: number;

  @Expose()
  public createdDate: Date;

}
