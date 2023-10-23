import { IsNumber,IsEnum, IsOptional, IsIn, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { DefaultQueryParam,  } from './query.constant';
import { WorkoutTime} from '@backend/shared/shared-types'

export class WorkoutByCoachQuery {
  @Transform(({ value } ) => +value ||  DefaultQueryParam.Limit)
  @IsNumber()
  @Max(DefaultQueryParam.Limit)
  @IsOptional()
  public limit = DefaultQueryParam.Limit;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @Transform(({ value } )=> value.indexOf(',') > -1 ? value.split(','):[value])
  @IsEnum(WorkoutTime, {each:true})
  @IsOptional()
  public workoutTime?: string;

  @IsOptional()
  public rating?: number;

  @IsOptional()
  public price?: string;

  @IsOptional()
  public calories?: string;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection?: 'desc' | 'asc' = DefaultQueryParam.Direction;

}
