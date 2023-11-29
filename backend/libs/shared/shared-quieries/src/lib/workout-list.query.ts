import { WorkoutType } from '@backend/shared/shared-types';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
} from 'class-validator';
import { DefaultQueryParam, sortDirections } from './query.constant';

export class WorkoutListQuery {
  @Transform(({ value }) => +value || DefaultQueryParam.Limit)
  @IsNumber()
  @Max(DefaultQueryParam.Limit)
  @IsOptional()
  public limit = DefaultQueryParam.Limit;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @Transform(({ value }) =>
    value.indexOf(',') > -1 ? value.split(',') : [value]
  )
  @IsEnum(WorkoutType, { each: true })
  @IsOptional()
  public workoutType?: string;

  @Transform(({ value }) => +value)
  @IsOptional()
  @IsInt()
  public ratingMin?: number;
  
  @Transform(({ value }) => +value)
  @IsOptional()
  @IsInt()
  public ratingMax?: number;

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

  @IsIn(sortDirections)
  @IsOptional()
  public sortDirection?: string = sortDirections[1];

  @IsOptional()
  public sortBy?: string = DefaultQueryParam.SortWorkouts;
}
