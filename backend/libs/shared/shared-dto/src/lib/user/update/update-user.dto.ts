import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { DescriptionLength, NameLength} from '../../constant';
import { Location, UserSex } from '@backend/shared/shared-types';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe'
  })
  @IsString()
  @MinLength(NameLength.Min)
  @MaxLength(NameLength.Max)
  @IsOptional()
  public name?: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserSex
  })
  @IsOptional()
  public sex?: UserSex;

  @ApiProperty({
    description: 'User location',
    enum: Location
  })
  @IsOptional()
  public location?: Location;

  @ApiProperty({
    description: 'User description'
  })
  @MinLength(DescriptionLength.Min)
  @MaxLength(DescriptionLength.Max)
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'User birthdate'
  })
  @IsString()
  @IsOptional()
  public birthDate?: string;

}
