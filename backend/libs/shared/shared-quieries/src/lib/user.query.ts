import { IsNumber,IsEnum, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { LIMIT } from './query.constant';
import {FitnessLevel, Location, UserRole, WorkoutType} from '@backend/shared/shared-types'

export class UserQuery {
  @Transform(({ value } ) => +value || LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = LIMIT;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @IsEnum(UserRole)
  @IsOptional()
  public role?: string;

  @Transform(({ value } )=> value.indexOf(',') > -1 ? value.split(','):[value])
  @IsEnum(WorkoutType, {each:true})
  @IsOptional()
  public workoutType?: string;

  @IsEnum(FitnessLevel)
  @IsOptional()
  public fitnessLevel?: string;

  @Transform(({ value } )=> value.indexOf(',') > -1 ? value.split(','):[value])
  @IsEnum(Location, {each:true})
  @IsOptional()
  public location?: string;

}
