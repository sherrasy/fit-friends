import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserSubscriptionsRdo {
  @ApiProperty({
    description: 'The unique user ID',
    example: '1'
  })
  @Expose({ name: '_id' })
  public id: number;

  @ApiProperty({
    description: 'User firstname and lastname',
    example: 'John Doe'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User email',
    example: 'test@test.ru'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Subscriptions on coaches',
  })
  @Expose()
  public subscriptions: number[];

}
