import {
  FitnessLevel,
  Location,
  UserRole,
  WorkoutType,
} from '@backend/shared/shared-types';
import { Transform } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional, Max } from 'class-validator';
import { DefaultQueryParam, sortDirections } from './query.constant';

export class UserQuery {
  @Transform(({ value }) => +value || DefaultQueryParam.Limit)
  @IsNumber()
  @Max(DefaultQueryParam.Limit)
  @IsOptional()
  public limit = DefaultQueryParam.Limit;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @IsEnum(UserRole)
  @IsOptional()
  public role?: string;

  @Transform(({ value }) =>
    value.indexOf(',') > -1 ? value.split(',') : [value]
  )
  @IsEnum(WorkoutType, { each: true })
  @IsOptional()
  public workoutType?: string;

  @IsEnum(FitnessLevel)
  @IsOptional()
  public fitnessLevel?: string;

  @Transform(({ value }) =>
    value.indexOf(',') > -1 ? value.split(',') : [value]
  )
  @IsEnum(Location, { each: true })
  @IsOptional()
  public location?: string;

  @IsIn(sortDirections)
  @IsOptional()
  public sortDirection?: string = sortDirections[1];

  @IsOptional()
  public sortBy?: string = DefaultQueryParam.SortBy;
}
