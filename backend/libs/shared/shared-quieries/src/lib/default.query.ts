import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, Max } from 'class-validator';
import { DefaultQueryParam, sortDirections } from './query.constant';

export class DefaultQuery {
  @Transform(({ value }) => +value || DefaultQueryParam.Limit)
  @IsNumber()
  @Max(DefaultQueryParam.Limit)
  @IsOptional()
  public limit = DefaultQueryParam.Limit;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @IsIn(sortDirections)
  @IsOptional()
  public sortDirection?: string = sortDirections[1];

  @IsOptional()
  public sortBy?: string = DefaultQueryParam.SortBy;
}
