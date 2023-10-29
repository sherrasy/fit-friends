import { IsNumber, IsOptional, IsIn, Max, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { DefaultQueryParam, orderSortings, sortDirections,  } from './query.constant';

export class CoachOrderQuery {
  @Transform(({ value } ) => +value ||  DefaultQueryParam.Limit)
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

  @IsIn(orderSortings)
  @IsOptional()
  public sortBy?: string = orderSortings[0];
}
