import { IsNumber,IsEnum, IsOptional, IsIn, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { DefaultQueryParam,  } from './query.constant';
import {FitnessLevel, Location, UserRole, WorkoutType} from '@backend/shared/shared-types'

export class WorkoutListQuery {
  @Transform(({ value } ) => +value ||  DefaultQueryParam.Limit)
  @IsNumber()
  @Max(DefaultQueryParam.Limit)
  @IsOptional()
  public limit = DefaultQueryParam.Limit;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @Transform(({ value } )=> value.indexOf(',') > -1 ? value.split(','):[value])
  @IsEnum(WorkoutType, {each:true})
  @IsOptional()
  public workoutType?: string;

  @IsOptional()
  public price?: string;

  @IsOptional()
  public rating?: string;

  @IsOptional()
  public calories?: string;


  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = DefaultQueryParam.Direction;

}
