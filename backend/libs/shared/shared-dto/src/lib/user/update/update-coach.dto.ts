import { FitnessLevel, WorkoutType } from "@backend/shared/shared-types";
import {WORKOUT_TYPE_AMOUNT } from "@backend/util-core";
import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, IsBoolean, IsEnum, IsOptional, MaxLength, MinLength } from "class-validator";
import { DescriptionLength } from "../../constant";
import { UpdateUserDto } from "./update-user.dto";

export class UpdateCoachDto extends UpdateUserDto {
  @ApiProperty({
    description: 'The level of fitness of the user',
    enum: FitnessLevel,
  })
  @IsEnum(WorkoutType)
  @IsOptional()
  public fitnessLevel?: FitnessLevel;

  @ApiProperty({
    description: 'Type of workout',
    enum: WorkoutType
  })
  @ArrayMaxSize(WORKOUT_TYPE_AMOUNT)
  @IsOptional()
  public workoutType?: WorkoutType[];

  @ApiProperty({
    description: 'Success description'
  })
  @MinLength(DescriptionLength.Min)
  @MaxLength(DescriptionLength.Max)
  @IsOptional()
  successInfo?: string;

  @ApiProperty({
    description: 'Open for personal training flag',
  })
  @IsBoolean()
  @IsOptional()
  isPersonal?: boolean;
}
