import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, Max } from 'class-validator';
import {
  DefaultQueryParam,
  NOTIFICATIONS_LIMIT,
  sortDirections,
} from './query.constant';

export class NotificationsQuery {
  @Transform(({ value }) => +value || NOTIFICATIONS_LIMIT)
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
