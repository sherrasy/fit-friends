import { IsNumber,IsEnum, IsOptional, IsIn, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { DefaultQueryParam, NOTIFICATIONS_LIMIT, sortDirections,  } from './query.constant';
import {FitnessLevel, Location, UserRole, WorkoutType} from '@backend/shared/shared-types'

export class NotificationsQuery {
  @Transform(({ value } ) => +value ||  NOTIFICATIONS_LIMIT)
  @IsNumber()
  @Max(NOTIFICATIONS_LIMIT)
  @IsOptional()
  public limit = NOTIFICATIONS_LIMIT;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @IsIn(sortDirections)
  @IsOptional()
  public sortDirection?: string = sortDirections[1];

  @IsOptional()
  public sortBy?: string = DefaultQueryParam.SortBy;

}
