import { FitnessLevel, WorkoutType } from "@backend/shared/shared-types";
import {WORKOUT_TYPE_AMOUNT } from "@backend/util-core";
import { CreateUserDto } from "./create-user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, IsBoolean, IsEnum, MaxLength, MinLength } from "class-validator";
import { DescriptionLength } from "../../constant";

export class CreateCoachDto extends CreateUserDto {
  @ApiProperty({
    description: 'The level of fitness of the user',
    enum: FitnessLevel,
  })
  @IsEnum(WorkoutType)
  public fitnessLevel: FitnessLevel;

  @ApiProperty({
    description: 'Type of workout',
    enum: WorkoutType
  })
  @ArrayMaxSize(WORKOUT_TYPE_AMOUNT)
  public workoutType: WorkoutType[];

  @ApiProperty({
    description: 'Success description'
  })
  @MinLength(DescriptionLength.Min)
  @MaxLength(DescriptionLength.Max)
  successInfo: string;

  @ApiProperty({
    description: 'Open for personal training flag',
  })
  @IsBoolean()
  isPersonal: boolean;
}
