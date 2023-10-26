import { IsNumber, IsOptional, IsIn, Max, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { DefaultQueryParam,  } from './query.constant';

export class WorkoutByCoachQuery {
  @Transform(({ value } ) => +value ||  DefaultQueryParam.Limit)
  @IsNumber()
  @Max(DefaultQueryParam.Limit)
  @IsOptional()
  public limit = DefaultQueryParam.Limit;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @Transform(({ value }) => value.split(",").join('|').split(" ").join(" & ") )
  @IsOptional()
  public workoutTime?: string;

  @Transform(({ value }) => +value)
  @IsOptional()
  @IsInt()
  public rating?: number;

  @Transform(({ value }) => +value)
  @IsOptional()
  @IsInt()
  public priceMin?: number;

  @Transform(({ value }) => +value)
  @IsOptional()
  @IsInt()
  public priceMax?: number;

  @Transform(({ value }) => +value)
  @IsOptional()
  @IsInt()
  public caloriesMin?: number;

  @Transform(({ value }) => +value)
  @IsOptional()
  @IsInt()
  public caloriesMax?: number;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = DefaultQueryParam.Direction;

  @IsOptional()
  public sortBy?: string = DefaultQueryParam.SortBy;
}
