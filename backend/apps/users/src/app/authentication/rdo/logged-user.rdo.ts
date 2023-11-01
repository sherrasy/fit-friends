import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The unique user ID',
    example: '1',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'test@test.ru',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Access token',
    example: 'test',
  })
  @Expose()
  public accessToken: string;
}
